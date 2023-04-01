import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React, { useEffect, useState } from "react"
import Breadcrumb from "../../../components/Breadcrumb"
import CreateItem from "../../../components/items/CreateItem"
import NoteItem from "../../../components/items/NoteItem"
import Layout from "../../../components/Layout"
import CreateNote from "../../../components/modals/CreateNote"
import NotePassword from "../../../components/modals/NotePassword"
import UpdateFolderName from "../../../components/modals/UpdateFolderName"
import UpdateNoteName from "../../../components/modals/UpdateNoteName"
import PlainText from "../../../components/noteTypes/PlainText"
import RichText from "../../../components/noteTypes/RichText"
import { useModalContext } from "../../../context/ModalContext"
import { decrypt } from "../../../core/encryption"
import { getFolderById } from "../../../core/folders"
import { getNotes, getNotesByFolderId } from "../../../core/notes"
import { getUserPaymentData, getUserSession } from "../../../core/users"

function Folder({ folder: initialFolder, notes }) {
  const [folder, setFolder] = useState(initialFolder)
  const { toggleUpdateFolderNameModal, toggleCreateNoteModal } =
    useModalContext()

  return (
    <Layout heading={folder.name} updateName={toggleUpdateFolderNameModal}>
      <Breadcrumb
        links={[
          { href: "/app", title: "Dashboard" },
          { href: "/app/folders", title: "Folders" },
          { title: folder.name }
        ]}
      />

      <section>
        <h2 className="text-2xl font-semibold">Notes</h2>

        <section className="flex gap-8 mt-7 flex-wrap">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}

          <CreateItem onClick={() => toggleCreateNoteModal(folder.id)} />
        </section>
      </section>

      <UpdateFolderName
        folderId={folder.id}
        initialName={folder.name}
        setFolder={setFolder}
      />
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

  const { data: folderData, error: folderError } = await getFolderById(
    supabase,
    ctx.params.id
  )

  // TODO: Handle error

  if (!folderData) {
    return {
      redirect: {
        destination: "/app/folders",
        permanent: false
      }
    }
  }

  const { data: notesData, error: notesError } = await getNotesByFolderId(
    supabase,
    ctx.params.id
  )

  // TODO: Handle error

  return {
    props: {
      initialSession: session,
      folder: folderData,
      notes: notesData,
      paymentData
    }
  }
}

export default Folder
