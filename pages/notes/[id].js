import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import PlainTextPublic from "../../components/public/PlainTextPublic"
import RichTextPublic from "../../components/public/RichTextPublic"
import { getNoteById } from "../../core/notes"
import { getUserSession } from "../../core/users"
import TodosPublic from "../../components/public/TodosPublic"
import Seo from "../../components/Seo"

const showEditor = (note, text) => {
  return note.type == "Plain Text" ? (
    <PlainTextPublic value={text} noteId={note.id} />
  ) : note.type == "Rich Text" ? (
    <RichTextPublic value={text} noteId={note.id} />
  ) : note.type === "Todo" ? (
    <TodosPublic todos={note.todos} />
  ) : null
}

function Note({ note: initialNote }) {
  const [note, setNote] = useState(initialNote)
  const [text, setText] = useState("")

  const decryptNote = async () => {
    const res = await axios.post("/api/decrypt", { text: note.text })
    setText(res.data.decryptedText)
  }

  useEffect(() => {
    if (note.type !== "Todo") decryptNote()
  }, [])

  return (
    <div className="mb-10">
      <Seo
        title={`${note.name} - Simplistic Notes`}
        description="Simplistic Notes offers affordable pricing plans to suit your note-taking needs, including a free plan with no credit card required. Choose the plan that's right for you and start taking notes with peace of mind"
      />

      <header className="bg-secondary w-full py-4 px-4 font-semibold flex gap-2 items-center justify-center">
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="Simplistic Notes Logo" className="w-6" />
          <p className="text-xl">
            <span className="hidden">S</span>implistic Notes
          </p>
        </Link>
      </header>

      <section className="px-5">
        <h1 className="text-center text-4xl font-bold mt-10">{note.name}</h1>

        <section className="shadow border-2 border-gray-100 max-w-4xl mx-auto mt-10 p-6 min-h-[20rem]">
          {showEditor(note, text)}
        </section>
      </section>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)

  const session = await getUserSession(supabase)

  //   if (!session) {
  //     return {
  //       redirect: {
  //         destination: "/signin",
  //         permanent: false
  //       }
  //     }
  //   }

  const { data: note, error } = await getNoteById(supabase, ctx.params.id)

  // TODO: Handle error

  if (!note) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      initialSession: session,
      note
    }
  }
}

export default Note
