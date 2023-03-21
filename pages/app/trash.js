import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import React from "react"
import Breadcrumb from "../../components/Breadcrumb"
import NoteItem from "../../components/items/NoteItem"
import Layout from "../../components/Layout"
import { getNotes, getNotesFromTrash } from "../../core/notes"
import { getUserPaymentData, getUserSession } from "../../core/users"

function Notes({ notes }) {
  return (
    <Layout heading="Notes">
      <Breadcrumb
        links={[{ href: "/app", title: "Dashboard" }, { title: "Trash" }]}
      />

      <section>
        <h2 className="text-2xl font-semibold">Trash</h2>

        <section className="flex gap-8 mt-7 flex-wrap">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
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

  const { data: notes, error } = await getNotesFromTrash(supabase)

  // TODO: Handle error

  return {
    props: {
      initialSession: session,
      notes,
      paymentData
    }
  }
}

export default Notes
