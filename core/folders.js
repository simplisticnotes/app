export const getFolders = async (supabase) => {
  return supabase.from("folders").select("*")
}

export const getFolderById = async (supabase, folderId) => {
  return supabase.from("folders").select("*").eq("id", folderId).single()
}

export const createFolder = async (supabase, folder) => {
  return supabase.from("folders").insert(folder)
}

export const updateFolderName = async (supabase, folderId, name) => {
  return supabase.from("folders").update({ name }).eq("id", folderId)
}
