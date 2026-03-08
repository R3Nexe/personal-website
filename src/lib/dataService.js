import { supabase } from "./supabaseClient";

const handleError = (context, error) => {
  console.error(`📦 DATA SERVICE ERROR [${context}]:`, error.message);
  throw error;
};

// Normalize Supabase rows: rename `description` back to `desc`
// so existing component props don't need to change
const normalize = (rows) =>
  rows.map(({ description, ...rest }) => ({ ...rest, desc: description }));

export async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  if (error) handleError("fetchProjects", error);
  return normalize(data);
}

export async function fetchUses() {
  const { data, error } = await supabase
    .from("uses")
    .select("*")
    .order("id", { ascending: true });

  if (error) handleError("fetchUses", error);
  return normalize(data);
}

export async function fetchTechStack() {
  const { data, error } = await supabase
    .from("techstack")
    .select("*")
    .order("id", { ascending: true });

  if (error) handleError("fetchTechStack", error);
  return normalize(data);
}

export async function fetchGallery() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("id", { ascending: true });

  if (error) handleError("fetchGallery", error);
  return normalize(data);
}
