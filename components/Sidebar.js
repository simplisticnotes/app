import React from "react"
import NavItem from "./items/NavItem"
import {
  HomeIcon,
  BookOpenIcon,
  FolderIcon,
  TrashIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  StarIcon
} from "@heroicons/react/24/outline"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { usePricingContext } from "../context/PricingContext"

function Sidebar() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const pricingData = usePricingContext()

  return (
    <>
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
            {pricingData.getUserPlan() === "FREE" && (
              <NavItem Icon={StarIcon} href="/pricing">
                Upgrade
              </NavItem>
            )}

            <NavItem Icon={UserCircleIcon} href="/app/profile">
              Profile
            </NavItem>

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
    </>
  )
}

export default Sidebar
