import React from "react"

const DropdownItem = ({ icon: Icon, label, onClick }) => {
  return (
    <li
      className="flex items-center flex-row gap-2 text-primary hover:bg-slate-200 p-2 rounded cursor-pointer"
      onClick={onClick}
    >
      <Icon className="w-4 p-0" /> {label}
    </li>
  )
}

export default DropdownItem
