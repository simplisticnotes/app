import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React, { useEffect, useState } from "react"
import Breadcrumb from "../../../components/Breadcrumb"
import Layout from "../../../components/Layout"
import NotePassword from "../../../components/modals/NotePassword"
import UpdateNoteName from "../../../components/modals/UpdateNoteName"
import PlainText from "../../../components/noteTypes/PlainText"
import RichText from "../../../components/noteTypes/RichText"
import { useModalContext } from "../../../context/ModalContext"
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
  const [noteLocked, setNoteLocked] = useState(true)
  const { toggleNotePasswordModal } = useModalContext()

  const decryptNote = async () => {
    const decryptedText = await decrypt(note.text)
    setText(decryptedText)
  }

  const showNote = () => setNoteLocked(false)

  useEffect(() => {
    if (note.apply_password) {
      toggleNotePasswordModal()
    } else {
      showNote()
    }
  }, [])

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

      {noteLocked ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-secondary"></div>
      ) : null}

      <NotePassword notePassword={note.password} showNote={showNote} />
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
