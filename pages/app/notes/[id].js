import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import axios from "axios"
import React, { useEffect, useState } from "react"
import Breadcrumb from "../../../components/Breadcrumb"
import Layout from "../../../components/Layout"
import NotePassword from "../../../components/modals/NotePassword"
import UpdateNoteName from "../../../components/modals/UpdateNoteName"
import PlainText from "../../../components/noteTypes/PlainText"
import RichText from "../../../components/noteTypes/RichText"
import Todos from "../../../components/noteTypes/Todos"
import { useModalContext } from "../../../context/ModalContext"
import { decrypt } from "../../../core/encryption"
import { getNoteById } from "../../../core/notes"
import { getUserPaymentData, getUserSession } from "../../../core/users"

const showEditor = (note, text, setText) => {
  return note.type == "Plain Text" ? (
    <PlainText value={text} onChange={setText} noteId={note.id} />
  ) : note.type == "Rich Text" ? (
    <RichText value={text} onChange={setText} noteId={note.id} />
  ) : note.type === "Todo" ? (
    <Todos noteId={note.id} todos={note.todos} />
  ) : null
}

function Note({ note: initialNote }) {
  const [note, setNote] = useState(initialNote)
  const [text, setText] = useState("")
  const [noteLocked, setNoteLocked] = useState(true)
  const { toggleNotePasswordModal } = useModalContext()
  const { toggleUpdateNoteNameModal } = useModalContext()

  const decryptNote = async () => {
    const res = await axios.post("/api/decrypt", { text: note.text })
    setText(res.data.decryptedText)
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
    if (note.type === "Plain Text" || note.type === "Rich Text") decryptNote()
  }, [])

  return (
    <Layout heading={note.name} updateName={toggleUpdateNoteNameModal}>
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

  const session = await getUserSession(supabase)

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false
      }
    }
  }

  const { data: paymentData } = await getUserPaymentData(
    supabase,
    session.user.id
  )

  const { data: note, error } = await getNoteById(supabase, ctx.params.id)

  // TODO: Handle error

  if (!note) {
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
      note,
      paymentData
    }
  }
}

export default Note
