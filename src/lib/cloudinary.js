// src/lib/cloudinary.js 
import { v2 as cloudinary } from "cloudinary";

function assertEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

let configured = false;
export function getCloudinary() {
  if (!configured) {
    cloudinary.config({
      cloud_name: assertEnv("CLOUDINARY_CLOUD_NAME"),
      api_key: assertEnv("CLOUDINARY_API_KEY"),
      api_secret: assertEnv("CLOUDINARY_API_SECRET"),
      secure: true,
    });
    configured = true;
  }
  return cloudinary;
}
