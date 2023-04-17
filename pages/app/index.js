import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React, { useEffect } from "react"
import CreateItem from "../../components/items/CreateItem"
import FolderItem from "../../components/items/FolderItem"
import Layout from "../../components/Layout"
import NoteItem from "../../components/items/NoteItem"
import { getNotes, getRecentNotes } from "../../core/notes"
import { useModalContext } from "../../context/ModalContext"
import { getFolders, getRecentFolders } from "../../core/folders"
import CreateNote from "../../components/modals/CreateNote"
import { getUserPaymentData, getUserSession } from "../../core/users"
import Seo from "../../components/Seo"
import { useNoteContext } from "../../context/NoteContext"
import { useFolderContext } from "../../context/FolderContext"

function App({}) {
  const { toggleCreateNoteModal, toggleCreateFolderModal } = useModalContext()
  const { getRecentNotes } = useNoteContext()
  const { getRecentFolders } = useFolderContext()

  const notes = getRecentNotes()
  const folders = getRecentFolders()

  return (
    <Layout heading="Dashboard">
      <Seo
        title={`Dashboard - Simplistic Notes`}
        description="Simplistic Notes offers affordable pricing plans to suit your note-taking needs, including a free plan with no credit card required. Choose the plan that's right for you and start taking notes with peace of mind"
      />

      <section>
        <h2 className="text-2xl font-semibold">Recent Notes</h2>

        <section className="flex gap-8 mt-7 flex-wrap">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}

          <CreateItem onClick={() => toggleCreateNoteModal()} />
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

  const { data: notes, error: notesError } = await getNotes(supabase)
  const { data: folders, error: foldersError } = await getFolders(supabase)

  // TODO: Handle error

  return {
    props: {
      initialSession: session,
      notes,
      folders,
      paymentData
    }
  }
}

export default App
