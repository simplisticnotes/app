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

function Trash({ notes }) {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const [clearTrashLoading, setClearTrashLoading] = useState(false)
  const [restoreTrashLoading, setRestoreTrashLoading] = useState(false)

  const clearTrashHandler = async () => {
    setClearTrashLoading(true)

    const { error } = await clearTrash(supabase)

    if (error) {
      return toast.error(error.message)
    }

    setClearTrashLoading(false)

    toast.success("Trash cleared!")

    refreshPage(router)
  }

  const restoreTrashHandler = async () => {
    setRestoreTrashLoading(true)

    const { error } = await restoreTrash(supabase)

    if (error) {
      return toast.error(error.message)
    }

    setRestoreTrashLoading(false)

    toast.success("Trash restored!")

    refreshPage(router)
  }

  return (
    <Layout heading="Notes">
      <Breadcrumb
        links={[{ href: "/app", title: "Dashboard" }, { title: "Trash" }]}
      />

      <section>
        <h2 className="text-2xl font-semibold">Trash</h2>

        {notes.length ? (
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
          {notes.length === 0 ? (
            <p className="text-lg">Trash is empty!</p>
          ) : null}

          {notes.map((note) => (
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

export default Trash
