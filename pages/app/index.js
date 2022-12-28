import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React from "react"
import CreateItem from "../../components/items/CreateItem"
import CreateNote from "../../components/modals/CreateNote"
import FolderItem from "../../components/items/FolderItem"
import Layout from "../../components/Layout"
import NoteItem from "../../components/items/NoteItem"
import { useAppContext } from "../../context/AppContext"
import { getNotes } from "../../core/notes"

function App({ notes }) {
  const { toggleCreateNoteModal } = useAppContext()

  return (
    <Layout heading="Dashboard">
      <section>
        <h2 className="text-2xl font-semibold">Recent Notes</h2>

        <section className="flex gap-8 mt-7 flex-wrap">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}

          <CreateItem onClick={toggleCreateNoteModal} />
        </section>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Recent Folders</h2>

        <section className="flex gap-8 mt-7 flex-wrap">
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />

          <CreateItem />
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

export default App
