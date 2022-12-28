import Link from "next/link"
import React from "react"

function Breadcrumb({ links = [] }) {
  return (
    <div className="breadcrumbs -translate-y-6">
      <ul>
        {links.map((link, i) =>
          i === links.length - 1 ? (
            <li>{link.title}</li>
          ) : (
            <li>
              <Link className="text-blue-500" href={link.href}>
                {link.title}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default Breadcrumb
