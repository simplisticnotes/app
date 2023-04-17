import React from "react"
import Layout from "../../../components/Layout"
import FolderItem from "../../../components/items/FolderItem"
import Breadcrumb from "../../../components/Breadcrumb"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { getFolders } from "../../../core/folders"
import { useModalContext } from "../../../context/ModalContext"
import CreateFolder from "../../../components/modals/CreateFolder"
import CreateItem from "../../../components/items/CreateItem"
import { getUserPaymentData, getUserSession } from "../../../core/users"
import CreateNote from "../../../components/modals/CreateNote"
import Seo from "../../../components/Seo"
import { useFolderContext } from "../../../context/FolderContext"

function Folders({}) {
  const { toggleCreateFolderModal } = useModalContext()
  const { folders } = useFolderContext()

  return (
    <Layout heading="Folders">
      <Seo
        title={`Folders - Simplistic Notes`}
        description="Simplistic Notes offers affordable pricing plans to suit your note-taking needs, including a free plan with no credit card required. Choose the plan that's right for you and start taking notes with peace of mind"
      />

      <Breadcrumb
        links={[{ href: "/app", title: "Dashboard" }, { title: "Folders" }]}
      />

      <section>
        <h2 className="text-2xl font-semibold">Your Folders</h2>

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

  const { data, error } = await getFolders(supabase)

  // TODO: Handle error

  return {
    props: {
      initialSession: session,
      folders: data,
      paymentData
    }
  }
}

export default Folders
