"use client";

import { createContext, useState, useEffect, useRef, useContext } from "react"; // ✅ agrega useContext
import useMedia from "@/hooks/useMedia";

export const MusicPlayerContext = createContext();

export const useMusicPlayer = () => {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx) {
    throw new Error("useMusicPlayer must be used inside MusicPlayerProvider");
  }
  return ctx;
};

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

  const HowlRef = useRef(null);

  const loadHowl = async () => {
    if (!HowlRef.current) {
      const { Howl } = await import("howler");
      HowlRef.current = Howl;
    }
  };

  useEffect(() => {
    if (isModalOpen) loadHowl();
  }, [isModalOpen]);

  const playSong = async (songId) => {
    if (!HowlRef.current) await loadHowl();

    const songToPlay = playlist.find((song) => song.id === songId);
    if (!songToPlay) {
      console.error("Song not found", songId);
      return;
    }

    if (sound && isPlaying) {
      sound.stop();
      sound.unload();
    }

    if (!playedSongs.includes(songId)) {
      setPlayedSongs((prev) => [...prev, songId]);
    }

    const newSound = new HowlRef.current({
      src: [songToPlay.url],
      html5: true, // ✅ recomendado para streams/Cloudinary (evita problemas de memoria/cors)
      onload: () => setDuration(newSound.duration()),
    });

    setSound(newSound);
    setCurrentSong(songToPlay);
    newSound.play();
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!playlist?.length) return;

    if (isShuffled) {
      let unplayedSongs = playlist.filter((song) => !playedSongs.includes(song.id));

      if (unplayedSongs.length === 0) {
        setPlayedSongs([]);
        unplayedSongs = playlist.filter((song) => song.id !== currentSong?.id);
      }

      const filtered = unplayedSongs.filter((song) => song.id !== currentSong?.id);
      const nextSong = filtered[Math.floor(Math.random() * filtered.length)];
      if (nextSong) playSong(nextSong.id);
      return;
    }

    let nextIndex = 0;
    if (currentSong) {
      const currentIndex = playlist.findIndex((s) => s.id === currentSong.id);
      nextIndex = (currentIndex + 1) % playlist.length;
    }
    playSong(playlist[nextIndex].id);
  };

  useEffect(() => {
    if (!sound) return;

    const onEnd = () => {
      if (repeatMode === "all") handleNext();
      else if (repeatMode === "none") {
        setIsPlaying(false);
        closeModal();
      } else if (repeatMode === "one") {
        sound.seek(0);
        sound.play();
      }
    };

    sound.on("end", onEnd);
    return () => sound.off("end", onEnd);
  }, [repeatMode, sound, handleNext, closeModal]);

  useEffect(() => {
    if (!isShuffled) setPlayedSongs([]);
  }, [isShuffled]);

  useEffect(() => {
    let raf;

    const updateProgress = () => {
      if (sound && !isSeeking) {
        const current = sound.seek() || 0;
        const dur = sound.duration() || 0;

        setCurrentTime(current);
        setDuration(dur);
        setProgress(dur ? current / dur : 0);
      }
      raf = requestAnimationFrame(updateProgress);
    };

    if (sound) raf = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(raf);
  }, [sound, isSeeking]);

  const handleSeek = (value) => {
    if (!sound) return;
    const dur = sound.duration() || 0;
    const seekPosition = value * dur;
    setCurrentTime(seekPosition);
    setProgress(value);
  };

  const handleSeekStart = () => setIsSeeking(true);

  const handleSeekMove = (e) => {
    if (!sound || !isSeeking) return;

    const dur = sound.duration() || 0;

    let ratio = 0;
    if (e.touches) {
      const touch = e.touches[0];
      const slider = e.target.getBoundingClientRect();
      ratio = (touch.clientX - slider.left) / slider.width;
    } else {
      ratio = parseFloat(e.target.value);
    }

    const newTime = Math.max(0, Math.min(dur, ratio * dur));
    setCurrentTime(newTime);
    setProgress(dur ? newTime / dur : 0);
  };

  const handleSeekEnd = (e) => {
    if (!sound) return;
    setIsSeeking(false);

    const dur = sound.duration() || 0;

    if (!e.touches) {
      const ratio = parseFloat(e.target.value);
      sound.seek(ratio * dur);
      return;
    }

    const touch = e.changedTouches[0];
    const slider = e.target.getBoundingClientRect();
    const ratio = (touch.clientX - slider.left) / slider.width;
    sound.seek(Math.max(0, Math.min(dur, ratio * dur)));
  };

  const togglePlayPause = () => {
    if (!sound) return;

    setIsPlaying((prev) => {
      const next = !prev;
      if (next) sound.play();
      else sound.pause();
      return next;
    });
  };

  const handlePrevious = () => {
    if (!playlist?.length || !currentSong) return;

    const currentIndex = playlist.findIndex((s) => s.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(playlist[previousIndex].id);
  };

  const handleRepeat = () => {
    setRepeatMode((prev) => (prev === "none" ? "all" : prev === "all" ? "one" : "none"));
  };

  const handleShuffle = () => setIsShuffled((prev) => !prev);

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
