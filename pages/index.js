import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React, { useEffect } from "react"
import Navbar from "../components/landingPage/Navbar"
import { getUserSession } from "../core/users"
import Link from "next/link"
import Image from "next/image"
import Feature from "../components/landingPage/Feature"

function index() {
  useEffect(() => {
    import("@lottiefiles/lottie-player")
  })

  return (
    <div className="px-6">
      <Navbar />

      {/* Hero Section */}
      <section className="container max-w-6xl flex gap-10 mt-24 items-center sm:flex-row flex-col">
        <div className="w-full flex flex-col items-center sm:items-start">
          <h1 className="text-4xl sm:text-6xl font-bold text-primary text-center sm:text-left">
            Keep Your Notes Organized and Secure with Simplistic Notes
          </h1>
          <p className="text-xl mt-8 text-center sm:text-left">
            Secure your notes with ease using our end-to-end encrypted app. Stay
            organized, share, and protect your ideas effortlessly. Try it now
            and experience secure note-taking like never before.
          </p>
          <Link href="/signin" className="btn btn-primary sm:btn-lg mt-8">
            Get Started
          </Link>
        </div>

        <div className="w-full h-96">
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

      <Feature
        title="End-to-End Encryption"
        description="Our app uses advanced encryption technology to ensure that all your
          notes remain private and secure. With end-to-end encryption, your
          notes are fully protected from unauthorized access, ensuring that only
          you and those you choose to share your notes with have access."
        image="/encryption.svg"
      />
      <Feature
        opposite
        title="Multiple Note Types"
        description="Whether you prefer plain text, rich text, or to-do lists, our app has got you covered. Take notes in any format that suits your needs, all in one convenient app."
        image="/note-types.svg"
      />
      <Feature
        title="Password-Protected Notes"
        description="Add an extra layer of security to your sensitive information by creating password-protected notes. This feature ensures that only those who have the password can access the information in the note."
        image="/password.svg"
      />
      <Feature
        opposite
        title="Shareable Notes"
        description="Share notes with others and give them access to view the information within the note. This feature is perfect for sharing information with coworkers, family and friends."
        image="/notes-sharing.svg"
      />
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
