import React from "react"
import { PencilIcon } from "@heroicons/react/24/outline"
import { useAppContext } from "../context/AppContext"
import { useRouter } from "next/router"

function Header({ heading }) {
  const { toggleUpdateNoteNameModal } = useAppContext()
  const router = useRouter()

  const showEditIcon = () => {
    return (
      router.pathname.includes("/notes/[id]") ||
      router.pathname.includes("/folders/[id]")
    )
  }

  return (
    <header className="bg-secondary w-full py-4 font-semibold flex justify-center gap-2 items-center">
      <h2 className="text-center text-xl">{heading}</h2>
      {showEditIcon() && (
        <PencilIcon
          onClick={toggleUpdateNoteNameModal}
          className="w-4 cursor-pointer hover:scale-110 "
        />
      )}
    </header>
  )
}

export default Header
