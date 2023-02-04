import React from "react"
import Content from "./Content"
import Header from "./Header"
import CreateFolder from "./modals/CreateFolder"
import CreateNote from "./modals/CreateNote"
import DeleteItem from "./modals/DeleteItem"
import Sidebar from "./Sidebar"

function Layout({ children, heading }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="grow">
        <Header heading={heading} />

        <Content>{children}</Content>
      </div>

      <CreateNote />
      <CreateFolder />
      <DeleteItem />
    </div>
  )
}

export default Layout
