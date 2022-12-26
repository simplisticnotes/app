export const getNotes = async (supabase) => {
  return supabase.from("notes").select("*")
}

export const getNoteById = async (supabase, noteId) => {
  return supabase.from("notes").select("*").eq("id", noteId).single()
}

export const createNote = async (supabase, note) => {
  return supabase.from("notes").insert(note)
}

export const updateNoteText = async (supabase, noteId, text) => {
  return supabase.from("notes").update({ text }).eq("id", noteId)
}
