import React from "react"
import Content from "./Content"
import Drawer from "./Drawer"
import Header from "./Header"
import CreateFolder from "./modals/CreateFolder"
import CreateNote from "./modals/CreateNote"
import DeleteItem from "./modals/DeleteItem"
import ShareNote from "./modals/ShareNote"
import Sidebar from "./Sidebar"

function Layout({ children, heading, updateName }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="grow">
        <Drawer>
          <Header heading={heading} updateName={updateName} />

          <Content>{children}</Content>
        </Drawer>
      </div>

      <CreateFolder />
      <DeleteItem />
      <ShareNote />
    </div>
  )
}

export default Layout
