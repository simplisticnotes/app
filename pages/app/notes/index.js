import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React from "react"
import Layout from "../../../components/Layout"
import NoteItem from "../../../components/items/NoteItem"
import { getNotes } from "../../../core/notes"
import Breadcrumb from "../../../components/Breadcrumb"
import { useModalContext } from "../../../context/ModalContext"
import CreateItem from "../../../components/items/CreateItem"
import CreateNote from "../../../components/modals/CreateNote"
import { getUserPaymentData, getUserSession } from "../../../core/users"
import Seo from "../../../components/Seo"

function Notes({ notes }) {
  const { toggleCreateNoteModal } = useModalContext()

  return (
    <Layout heading="Notes">
      <Seo
        title={`Notes - Simplistic Notes`}
        description="Simplistic Notes offers affordable pricing plans to suit your note-taking needs, including a free plan with no credit card required. Choose the plan that's right for you and start taking notes with peace of mind"
      />

      <Breadcrumb
        links={[{ href: "/app", title: "Dashboard" }, { title: "Notes" }]}
      />

      <section>
        <h2 className="text-2xl font-semibold">Your Notes</h2>

        <section className="flex gap-8 mt-7 flex-wrap">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}

          <CreateItem onClick={() => toggleCreateNoteModal()} />
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

  const { data, error } = await getNotes(supabase)

  // TODO: Handle error

  return {
    props: {
      initialSession: session,
      notes: data,
      paymentData
    }
  }
}

export default Notes
