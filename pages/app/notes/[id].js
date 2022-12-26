import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React, { useState } from "react"
import Layout from "../../../components/Layout"
import PlainText from "../../../components/noteTypes/PlainText"
import RichText from "../../../components/noteTypes/RichText"
import { getNoteById } from "../../../core/notes"

const showEditor = (note, text, setText) => {
  return note.type == "Plain Text" ? (
    <PlainText value={text} onChange={setText} noteId={note.id} />
  ) : note.type == "Rich Text" ? (
    <RichText value={text} onChange={setText} noteId={note.id} />
  ) : null
}

function Note({ note }) {
  const [text, setText] = useState(note.text)

  return <Layout heading={note.name}>{showEditor(note, text, setText)}</Layout>
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
