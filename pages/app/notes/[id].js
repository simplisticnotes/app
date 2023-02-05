import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React, { useEffect, useState } from "react"
import Breadcrumb from "../../../components/Breadcrumb"
import Layout from "../../../components/Layout"
import UpdateNoteName from "../../../components/modals/UpdateNoteName"
import PlainText from "../../../components/noteTypes/PlainText"
import RichText from "../../../components/noteTypes/RichText"
import { decrypt } from "../../../core/encryption"
import { getNoteById } from "../../../core/notes"

const showEditor = (note, text, setText) => {
  return note.type == "Plain Text" ? (
    <PlainText value={text} onChange={setText} noteId={note.id} />
  ) : note.type == "Rich Text" ? (
    <RichText value={text} onChange={setText} noteId={note.id} />
  ) : null
}

function Note({ note: initialNote }) {
  const [note, setNote] = useState(initialNote)
  const [text, setText] = useState("")

  const decryptNote = async () => {
    const decryptedText = await decrypt(note.text)
    setText(decryptedText)
  }

  useEffect(() => {
    decryptNote()
  }, [])

  return (
    <Layout heading={note.name}>
      <Breadcrumb
        links={[
          { href: "/app", title: "Dashboard" },
          { href: "/app/notes", title: "Notes" },
          { title: note.name }
        ]}
      />

      {showEditor(note, text, setText)}

      <UpdateNoteName
        noteId={note.id}
        initialName={note.name}
        setNote={setNote}
      />
    </Layout>
  )
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

  const { data, error } = await getNoteById(supabase, ctx.params.id)

  // TODO: Handle error

  if (!data) {
    return {
      redirect: {
        destination: "/app/notes",
        permanent: false
      }
    }
  }

  return {
    props: {
      initialSession: session,
      note: data
    }
  }
}

export default Note
