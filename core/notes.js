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
  return supabase.from("notes").insert(note).select("*").single()
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

export const restoreNote = async (supabase, id) => {
  const { data: note } = await supabase
    .from("trash")
    .select("*")
    .eq("id", id)
    .single()
  await supabase.from("notes").insert(note)
  return supabase.from("trash").delete().eq("id", id)
}

export const deleteNoteFromTrash = async (supabase, id) => {
  return supabase.from("trash").delete().eq("id", id)
}

export const clearTrash = async (supabase) => {
  return supabase.from("trash").delete().neq("type", "")
}

export const restoreTrash = async (supabase) => {
  const { data: notes } = await supabase.from("trash").select("*")
  await supabase.from("notes").insert(notes)
  return supabase.from("trash").delete().neq("type", "")
}

export const updateTodoNote = async (supabase, noteId, todos) => {
  return supabase.from("notes").update({ todos }).eq("id", noteId)
}
