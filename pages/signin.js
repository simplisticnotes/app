import React, { useEffect } from "react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"

function signin() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) router.replace("/app")
  }, [user])

  return (
    <>
      <h1 className="text-6xl text-center mt-10 font-bold">
        Join Simplistic Notes
      </h1>
      <div className="w-96 mx-auto">
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          redirectTo={"http://localhost:3000/signin"}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#49111C"
                }
              }
            }
          }}
        />
      </div>
    </>
  )
}

export default signin
