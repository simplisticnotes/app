import React from "react"
import { useModalContext } from "../../context/ModalContext"

const DropdownItem = ({ icon: Icon, label, onClick, disabled = false }) => {
  const { toggleUpgradeModal } = useModalContext()

  const toggleUpgradeModalHandler = (e) => {
    e.preventDefault()
    toggleUpgradeModal()
  }

  return (
    <li
      className={[
        "flex items-center flex-row gap-2 text-primary hover:bg-slate-200 p-2 rounded cursor-pointer",
        disabled ? "bg-slate-200 cursor-not-allowed" : null
      ].join(" ")}
      onClick={(e) => (disabled ? toggleUpgradeModalHandler(e) : onClick(e))}
    >
      <Icon className="w-4 p-0" /> {label}
    </li>
  )
}

export default DropdownItem
