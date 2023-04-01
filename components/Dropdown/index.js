import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import React from "react"

const Dropdown = ({ children, className }) => {
  return (
    <div className={`dropdown ${className}`}>
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
        className="dropdown-content menu p-2 shadow-lg border-2 border-primary bg-base-100 rounded w-32 right-0 sm:-right-28"
      >
        {children}
      </ul>
    </div>
  )
}

export default Dropdown
