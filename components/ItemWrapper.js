import Link from "next/link"
import React from "react"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/outline"

function ItemWrapper({ children, href, className, onDelete }) {
  return (
    <Link
      href={href || "#"}
      className={[
        "relative gap-3 xs:w-48 w-full  flex flex-col items-center py-4 px-2 cursor-pointer shadow-md hover:shadow-lg hover:border-primary border-white border-2",
        className
      ].join(" ")}
    >
      <div className="dropdown absolute top-0 right-2">
        <label
          tabIndex={0}
          className="cursor-pointer"
          onClick={(e) => {
            // avoid the above link from opening
            e.preventDefault()
          }}
        >
          <EllipsisHorizontalIcon className="w-6 hover:bg-slate-200 rounded-full" />
        </label>

        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow-lg border-2 border-primary bg-base-100 rounded w-32"
        >
          <li
            className="flex items-center flex-row gap-2 text-red-500 hover:bg-slate-200 p-2 rounded"
            onClick={(e) => {
              e.preventDefault()
              onDelete()
            }}
          >
            <TrashIcon className="w-4 p-0" /> Delete
          </li>
        </ul>
      </div>

      {children}
    </Link>
  )
}

export default ItemWrapper
