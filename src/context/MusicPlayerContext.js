"use client";

import { createContext, useState, useEffect, useRef } from "react";
import useMedia from "@/hooks/useMedia";

export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const { playlist, closeModal, isModalOpen } = useMedia();

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [repeatMode, setRepeatMode] = useState("none");
  const [isShuffled, setIsShuffled] = useState(false);
  const [playedSongs, setPlayedSongs] = useState([]);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const HowlRef = useRef(null); // Ref to hold the Howl constructor

  const loadHowl = async () => {
    if (!HowlRef.current) {
      const { Howl } = await import("howler");
      HowlRef.current = Howl;
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      loadHowl();
    }
  }, [isModalOpen]);

  const playSong = async (songId) => {
    if (!HowlRef.current) {
      await loadHowl();
    }

    // Find the song in the playlist
    const songToPlay = playlist.find((song) => song.id === songId);
    if (!songToPlay) {
      console.error("Song not found");
      return;
    }

    if (sound && isPlaying) {
      sound.stop();
      sound.unload();
    } else {
      console.log("No song to stop/unload");
    }

    // Add the song ID to the playedSongs list
    if (!playedSongs.includes(songId)) {
      setPlayedSongs((prev) => [...prev, songId]);
    }

    const newSound = new HowlRef.current({
      src: [songToPlay.url],
      onload: () => setDuration(newSound.duration()), // Set duration on load
    });

    setSound(newSound);
    setCurrentSong(songToPlay);
    newSound.play();
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (isShuffled) {
      let unplayedSongs = playlist.filter(
        (song) => !playedSongs.includes(song.id),
      );

      // Check if all songs have been played
      if (unplayedSongs.length === 0) {
        // Reset the playedSongs list
        setPlayedSongs([]);

        // Re-fetch the unplayedSongs list after resetting
        unplayedSongs = playlist.filter((song) => song.id !== currentSong.id);
      }

      // Ensure the next song is not the current one
      const filteredUnplayedSongs = unplayedSongs.filter(
        (song) => song.id !== currentSong.id,
      );

      // Play a random unplayed song
      const nextSongIndex = Math.floor(
        Math.random() * filteredUnplayedSongs.length,
      );
      const nextSong = filteredUnplayedSongs[nextSongIndex];
      playSong(nextSong.id);
    } else {
      // Non-shuffle mode
      let nextIndex;
      if (currentSong) {
        const currentIndex = playlist.findIndex((s) => s.id === currentSong.id);
        nextIndex = (currentIndex + 1) % playlist.length;
      } else {
        nextIndex = 0; // Start from the beginning if no current song
      }
      playSong(playlist[nextIndex].id);
    }
  };

  //Repeat useEffect
  useEffect(() => {
    if (!sound) return;

    sound.on("end", () => {
      if (repeatMode === "all") {
        handleNext();
      } else if (repeatMode === "none") {
        setIsPlaying(false);
        closeModal();
      } else if (repeatMode === "one") {
        sound.seek(0);
        sound.play();
      }
    });

    // Cleanup
    return () => {
      sound.off("end");
    };
  }, [repeatMode, sound, handleNext]);

  //Shuffle useEffect
  useEffect(() => {
    if (!isShuffled) {
      // Reset playedSongs list when shuffle is turned off
      setPlayedSongs([]);
    }
  }, [isShuffled]);

  //Progress Bar useEffect
  // This effect updates the progress while the track is playing
  useEffect(() => {
    let animationFrameId;

    const updateProgress = () => {
      if (!isSeeking) {
        const current = sound.seek() || 0;
        setCurrentTime(current);
        setProgress(currentTime / sound.duration()); // Update progress here
      }
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    if (sound) {
      animationFrameId = requestAnimationFrame(updateProgress);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [sound, isSeeking, currentTime]);

  const handleSeek = (value) => {
    const seekPosition = value * sound.duration();
    setCurrentTime(seekPosition); // Only update the state
    setProgress(value); // Update progress
  };

  const handleSeekStart = () => {
    setIsSeeking(true); // Indicate that user started seeking
  };

  const handleSeekMove = (e) => {
    if (isSeeking) {
      let newValue;
      if (e.touches) {
        // For touch events
        // Calculate the new value based on touch position
        const touch = e.touches[0];
        const slider = e.target.getBoundingClientRect();
        const ratio = (touch.clientX - slider.left) / slider.width;
        newValue = ratio * sound.duration();
      } else {
        // For mouse events
        newValue = parseFloat(e.target.value) * sound.duration();
      }
      setCurrentTime(newValue); // Update currentTime
      setProgress(newValue / sound.duration()); // Update progress
    }
  };

  const handleSeekEnd = (e) => {
    setIsSeeking(false);
    if (!e.touches) {
      const seekPosition = parseFloat(e.target.value) * sound.duration();
      sound.seek(seekPosition);
    } else {
      // For touch events, calculate and apply the final seek position
      const touch = e.changedTouches[0];
      const slider = e.target.getBoundingClientRect();
      const finalPosition =
        ((touch.clientX - slider.left) / slider.width) * sound.duration();
      sound.seek(finalPosition);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      sound.play();
    } else sound.pause();
  };

  const handlePrevious = () => {
    // Finds the index of the current song
    const currentIndex = playlist.findIndex((s) => s.id === currentSong.id);
    // Calculates the ID of the previous song
    const previousIndex =
      (currentIndex - 1 + playlist.length) % playlist.length;
    const previousSongId = playlist[previousIndex].id;
    playSong(previousSongId);
  };

  const handleRepeat = () => {
    switch (repeatMode) {
      case "none":
        setRepeatMode("all");
        break;
      case "all":
        setRepeatMode("one");
        break;
      case "one":
        setRepeatMode("none");
        break;
      default:
        setRepeatMode("none");
    }
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        sound,
        isPlaying,
        playSong,
        togglePlayPause,
        handleNext,
        handlePrevious,
        handleShuffle,
        isShuffled,
        handleRepeat,
        repeatMode,
        progress,
        setProgress,
        handleSeek,
        handleSeekStart,
        handleSeekMove,
        handleSeekEnd,
        duration,
        currentTime,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
