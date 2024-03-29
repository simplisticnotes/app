import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { useState } from "react"
import toast from "react-hot-toast"
import Breadcrumb from "../../components/Breadcrumb"
import NoteItem from "../../components/items/NoteItem"
import Layout from "../../components/Layout"
import {
  clearTrash,
  getNotes,
  getNotesFromTrash,
  restoreTrash
} from "../../core/notes"
import { getUserPaymentData, getUserSession } from "../../core/users"
import { refreshPage } from "../../utils"
import { TrashIcon, ArrowUpOnSquareIcon } from "@heroicons/react/24/outline"
import Spinner from "../../components/Spinner"
import CreateNote from "../../components/modals/CreateNote"
import Seo from "../../components/Seo"
import { useNoteContext } from "../../context/NoteContext"

function Trash({}) {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const [clearTrashLoading, setClearTrashLoading] = useState(false)
  const [restoreTrashLoading, setRestoreTrashLoading] = useState(false)

  const { trashNotes, clearTrashNotes } = useNoteContext()

  const clearTrashHandler = async () => {
    setClearTrashLoading(true)

    const { error } = await clearTrash(supabase)

    setClearTrashLoading(false)

    if (error) {
      return toast.error(error.message)
    }

    toast.success("Trash cleared!")

    clearTrashNotes()
  }

  const restoreTrashHandler = async () => {
    setRestoreTrashLoading(true)

    const { error } = await restoreTrash(supabase)

    setRestoreTrashLoading(false)

    if (error) {
      return toast.error(error.message)
    }

    toast.success("Trash restored!")

    clearTrashNotes()
  }

  return (
    <Layout heading="Notes">
      <Seo
        title={`Trash - Simplistic Notes`}
        description="Simplistic Notes offers affordable pricing plans to suit your note-taking needs, including a free plan with no credit card required. Choose the plan that's right for you and start taking notes with peace of mind"
      />

      <Breadcrumb
        links={[{ href: "/app", title: "Dashboard" }, { title: "Trash" }]}
      />

      <section>
        <h2 className="text-2xl font-semibold">Trash</h2>

        {trashNotes.length ? (
          <div className="flex justify-between mt-8">
            <button
              className="btn btn-primary btn-outline flex items-center gap-2"
              onClick={restoreTrashHandler}
              disabled={restoreTrashLoading}
            >
              {restoreTrashLoading ? (
                <Spinner />
              ) : (
                <ArrowUpOnSquareIcon className="w-4 -mt-1" />
              )}{" "}
              Restore Trash
            </button>

            <button
              className="btn btn-error btn-outline flex items-center gap-2"
              onClick={clearTrashHandler}
              disabled={clearTrashLoading}
            >
              {clearTrashLoading ? (
                <Spinner />
              ) : (
                <TrashIcon className="w-4 -mt-1" />
              )}{" "}
              Clear Trash
            </button>
          </div>
        ) : null}

        <section className="flex gap-8 mt-7 flex-wrap">
          {trashNotes.length === 0 ? (
            <p className="text-lg">Trash is empty!</p>
          ) : null}

          {trashNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              disabled
              canDelete={false}
              canShare={false}
              canRestore={true}
              canDeleteTrash={true}
            />
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

  const { data: trashNotes, error } = await getNotesFromTrash(supabase)

  // TODO: Handle error

  return {
    props: {
      initialSession: session,
      trashNotes,
      paymentData
    }
  }
}

export default Trash
