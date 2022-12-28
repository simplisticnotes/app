import React from "react"
import Content from "./Content"
import Header from "./Header"
import Sidebar from "./Sidebar"

function Layout({ children, heading }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="grow">
        <Header heading={heading} />

        <Content>{children}</Content>
      </div>
    </div>
  )
}

export default Layout
