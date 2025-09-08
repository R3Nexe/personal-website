// src/lib/storage.js
import { supabase } from "./supabaseClient";

export function getPublicUrl(path) {
  if (!path) return null;

  const { data, error } = supabase.storage
    .from("gallery")         // your bucket name
    .getPublicUrl(path); // path inside the bucket

  if (error) {
    console.error("Supabase Storage error:", error);
    return null;
  }

  return data.publicUrl;
}
