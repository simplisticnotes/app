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
    <header className="bg-secondary w-full py-4 px-4 font-semibold flex gap-2 items-center">
      <label for="my-drawer" className="drawer-button block sm:hidden">
        <Bars3Icon className="w-6 cursor-pointer" />
      </label>

      <div className="flex grow justify-center gap-2">
        <h2 className="text-center text-xl">{heading}</h2>

        {showEditIcon() && (
          <PencilIcon
            onClick={updateName}
            className="w-4 cursor-pointer hover:scale-110 "
          />
        )}
      </div>
    </header>
  )
}

export default Header
