
import { supabase } from "./supabaseClient";

const logStorageError = (context, error, extra = {}) => {
  console.error(`📁 STORAGE ERROR [${context}]:`, {
    message: error.message || error,
    ...extra,
  });
};

export function publicUrl(path) {
  if (!path || typeof path !== "string") {
    logStorageError("INVALID_PATH", new Error("Path must be a non-empty string"), {
      providedPath: path,
    });
    return null;
  }

  try {
    const { data, error } = supabase.storage.from("assets").getPublicUrl(path);

    if (error) {
      logStorageError("SUPABASE_STORAGE_ERROR", error, { path });
      return null;
    }

    if (!data?.publicUrl) {
      logStorageError("NO_PUBLIC_URL", new Error("Supabase did not return a URL"), { path });
      return null;
    }

    return data.publicUrl;
  } catch (err) {
    logStorageError("UNEXPECTED_ERROR", err, { path });
    return null;
  }
}
