import React from "react"
import Content from "./Content"
import Drawer from "./Drawer"
import Header from "./Header"
import CreateFolder from "./modals/CreateFolder"
import DeleteItem from "./modals/DeleteItem"
import DeleteTrash from "./modals/DeleteTrash"
import RestoreNote from "./modals/RestoreNote"
import ShareNote from "./modals/ShareNote"
import Sidebar from "./Sidebar"
import SpeedDial from "./SpeedDial"
import BottomNav from "./BottomNav"

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
      <RestoreNote />
      <DeleteTrash />

      {/* <SpeedDial /> */}
      <BottomNav />
    </div>
  )
}

export default Layout
