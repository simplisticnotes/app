import React from "react"
import Content from "./Content"
import Header from "./Header"
import CreateFolder from "./modals/CreateFolder"
import CreateNote from "./modals/CreateNote"
import DeleteItem from "./modals/DeleteItem"
import Sidebar from "./Sidebar"

function Layout({ children, heading, updateName }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="grow">
        <Header heading={heading} updateName={updateName} />

        <Content>{children}</Content>
      </div>

      <CreateFolder />
      <DeleteItem />
    </div>
  )
}

export default Layout
