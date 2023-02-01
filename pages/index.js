import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React from "react"

function index() {
  return <div>index</div>
}

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false
      }
    }
  }

  return {
    redirect: {
      destination: "/app",
      permanent: false
    }
  }
}

export default index
