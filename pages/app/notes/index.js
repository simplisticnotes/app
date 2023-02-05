import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React from "react"
import Layout from "../../../components/Layout"
import NoteItem from "../../../components/items/NoteItem"
import { getNotes } from "../../../core/notes"
import Breadcrumb from "../../../components/Breadcrumb"
import { useModalContext } from "../../../context/ModalContext"
import CreateItem from "../../../components/items/CreateItem"
import CreateNote from "../../../components/modals/CreateNote"

function Notes({ notes }) {
  const { toggleCreateNoteModal } = useModalContext()

  return (
    <Layout heading="Notes">
      <Breadcrumb
        links={[{ href: "/app", title: "Dashboard" }, { title: "Notes" }]}
      />

      <section>
        <h2 className="text-2xl font-semibold">Your Notes</h2>

        <section className="flex gap-8 mt-7 flex-wrap">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}

          <CreateItem onClick={toggleCreateNoteModal} />
        </section>
      </section>

      <CreateNote />
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

  const { data, error } = await getNotes(supabase)

  // TODO: Handle error

  return {
    props: {
      initialSession: session,
      notes: data
    }
  }
}

export default Notes
