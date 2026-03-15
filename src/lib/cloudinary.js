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
  cloudinary.config(process.env.CLOUDINARY_URL);
    configured = true;
  }
  return cloudinary;
}
