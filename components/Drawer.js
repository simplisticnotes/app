import { useRouter } from "next/router"
import NavItem from "./items/NavItem"
import {
  HomeIcon,
  BookOpenIcon,
  FolderIcon,
  TrashIcon,
  ArrowLeftOnRectangleIcon,
  StarIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { usePricingContext } from "../context/PricingContext"

function Drawer({ children }) {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const pricingData = usePricingContext()

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content overflow-x-hidden">
        {/* <!-- Page content here --> */}
        {children}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        <div className="w-80 bg-base-100 p-6 flex flex-col">
          {/* <!-- Sidebar content here --> */}
          <div className="grow">
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

          <div className="pb-12">
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
    </div>
  )
}

export default Drawer
