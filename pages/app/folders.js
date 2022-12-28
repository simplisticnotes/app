import React from "react"
import Layout from "../../components/Layout"
import FolderItem from "../../components/items/FolderItem"
import Breadcrumb from "../../components/Breadcrumb"

function Folders() {
  return (
    <Layout heading="Folders">
      <Breadcrumb
        links={[{ href: "/app", title: "Dashboard" }, { title: "Folders" }]}
      />

      <section>
        <h2 className="text-2xl font-semibold">Your Folders</h2>

        <section className="flex gap-8 mt-7 flex-wrap">
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />
        </section>
      </section>
    </Layout>
  )
}

export default Folders
