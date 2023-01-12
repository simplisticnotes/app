import React from "react"
import Layout from "../../components/Layout"
import FolderItem from "../../components/items/FolderItem"
import Breadcrumb from "../../components/Breadcrumb"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { getFolders } from "../../core/folders"
import { useModalContext } from "../../context/ModalContext"
import CreateFolder from "../../components/modals/CreateFolder"
import CreateItem from "../../components/items/CreateItem"

function Folders({ folders }) {
  const { toggleCreateFolderModal } = useModalContext()

  return (
    <Layout heading="Folders">
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

      <CreateFolder />
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

  const { data, error } = await getFolders(supabase)

  // TODO: Handle error

  return {
    props: {
      initialSession: session,
      folders: data
    }
  }
}

export default Folders
