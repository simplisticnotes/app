import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React from "react"
import CreateItem from "../../components/items/CreateItem"
import CreateNote from "../../components/modals/CreateNote"
import FolderItem from "../../components/items/FolderItem"
import Layout from "../../components/Layout"
import NoteItem from "../../components/items/NoteItem"
import { getNotes } from "../../core/notes"
import { useModalContext } from "../../context/ModalContext"
import CreateFolder from "../../components/modals/CreateFolder"
import { getFolders } from "../../core/folders"
import DeleteItem from "../../components/modals/DeleteItem"

function App({ notes, folders }) {
  const { toggleCreateNoteModal, toggleCreateFolderModal } = useModalContext()

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
          {folders.map((folder) => (
            <FolderItem key={folder.id} folder={folder} />
          ))}

          <CreateItem onClick={toggleCreateFolderModal} />
        </section>
      </section>

      <CreateNote />
      <CreateFolder />
      <DeleteItem />
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

  const { data: notes, error: notesError } = await getNotes(supabase)
  const { data: folders, error: foldersError } = await getFolders(supabase)

  // TODO: Handle error

  return {
    props: {
      initialSession: session,
      notes,
      folders
    }
  }
}

export default App
