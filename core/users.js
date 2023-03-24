export const getUserPaymentData = async (supabase, userId) => {
  return supabase
    .from("user_payment_data")
    .select("*")
    .eq("user_id", userId)
    .single()
}

export const getUserSession = async (supabase) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) return null

  return session
}

export const updateUser = async (supabase, metadata) => {
  const { data, error } = await supabase.auth.updateUser({
    password: undefined,
    data: metadata
  })

  await supabase.auth.refreshSession()

  return data
}
