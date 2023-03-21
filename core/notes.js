export const getNotes = async (supabase) => {
  return supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false })
}

export const getRecentNotes = async (supabase) => {
  return supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)
}

export const getNotesByFolderId = async (supabase, folderId) => {
  return supabase
    .from("notes")
    .select("*")
    .eq("folder_id", folderId)
    .order("created_at", { ascending: false })
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
  const { data: note } = await getNoteById(supabase, id)
  await supabase.from("trash").insert(note)
  return supabase.from("notes").delete().eq("id", id)
}

export const getNotesFromTrash = async (supabase) => {
  return supabase.from("trash").select("*")
}
