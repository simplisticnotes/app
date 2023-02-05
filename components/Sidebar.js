import React from "react"
import NavItem from "./items/NavItem"
import {
  HomeIcon,
  BookOpenIcon,
  FolderIcon,
  TrashIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"

function Sidebar() {
  const router = useRouter()
  const supabase = useSupabaseClient()

  return (
    <div className="w-48 min-h-screen hidden sm:block">
      <div className="flex flex-col sticky top-0 left-0 right-0 bottom-0 w-48 min-h-screen bg-secondary">
        <div className="border-b-2 pt-2 pb-3 border-white">
          <img
            src="/logo.svg"
            alt="Simplistic Notes Logo"
            className="w-6 block mx-auto"
          />
        </div>

        <div className="px-4 mt-8 grow">
          <NavItem href="/app" Icon={HomeIcon}>
            Dashboard
          </NavItem>
          <NavItem href="/app/notes" Icon={BookOpenIcon}>
            Notes
          </NavItem>
          <NavItem href="/app/folders" Icon={FolderIcon}>
            Folders
          </NavItem>
          <NavItem href="/app/trash" Icon={TrashIcon}>
            Trash
          </NavItem>
        </div>

        <div className="px-4">
          <NavItem
            Icon={ArrowLeftOnRectangleIcon}
            button
            onClick={async () => {
              await supabase.auth.signOut()
              router.push("/signin")
            }}
          >
            Logout
          </NavItem>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
