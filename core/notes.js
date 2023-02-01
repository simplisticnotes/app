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

export const updateNoteName = async (supabase, noteId, name) => {
  return supabase.from("notes").update({ name }).eq("id", noteId)
}

export const deleteNote = async (supabase, id) => {
  console.log("DELETE", id)
  return supabase.from("notes").delete().eq("id", id)
}
