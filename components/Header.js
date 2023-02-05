import React from "react"
import { PencilIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { Bars3Icon } from "@heroicons/react/24/outline"

function Header({ heading, updateName }) {
  const router = useRouter()

  const showEditIcon = () => {
    return (
      router.pathname.includes("/notes/[id]") ||
      router.pathname.includes("/folders/[id]")
    )
  }

  return (
    <header className="bg-secondary w-full py-4 font-semibold flex justify-between sm:justify-center gap-2 items-center">
      <Bars3Icon className="w-6 block sm:hidden" />

      <h2 className="text-center text-xl">{heading}</h2>

      {showEditIcon() && (
        <PencilIcon
          onClick={updateName}
          className="w-4 cursor-pointer hover:scale-110 "
        />
      )}
    </header>
  )
}

export default Header
