import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React, { useEffect } from "react"
import Navbar from "../components/landingPage/Navbar"
import { getUserSession } from "../core/users"

function index() {
  useEffect(() => {
    import("@lottiefiles/lottie-player")
  })

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="container max-w-7xl flex gap-10 mt-24 items-center">
        <div className="w-full">
          <h1 className="text-6xl font-bold text-primary">
            Keep Your Notes Organized and Secure with Simplistic Notes
          </h1>
          <p className="text-xl mt-8">
            Secure your notes with ease using our end-to-end encrypted app. Stay
            organized, share, and protect your ideas effortlessly. Try it now
            and experience secure note-taking like never before.
          </p>
          <button className="btn btn-primary btn-lg mt-8">Get Started</button>
        </div>

        <div className="w-full h-96 -mr-40">
          <lottie-player
            src="https://assets7.lottiefiles.com/private_files/lf30_kl7dperf.json"
            background="transparent"
            speed="1"
            style={{
              width: "100%",
              height: "100%"
            }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)

  const session = await getUserSession(supabase)

  if (session) {
    return {
      redirect: {
        destination: "/app",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default index
