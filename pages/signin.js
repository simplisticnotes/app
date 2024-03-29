import React, { useEffect } from "react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import Logo from "../components/Logo"
import Seo from "../components/Seo"

function signin() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) router.replace("/app")
  }, [user])

  return (
    <div className="px-6">
      <Seo
        title="Signin - Simplistic Notes"
        description="Simplistic Notes offers affordable pricing plans to suit your note-taking needs, including a free plan with no credit card required. Choose the plan that's right for you and start taking notes with peace of mind"
      />

      <Logo textSize="text-4xl" imageSize="w-12" className="mt-5 mb-10" />

      <div className="w-96 mx-auto">
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/signin`}
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
    </div>
  )
}

export default signin
