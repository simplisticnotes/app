import React from "react"
import NavItem from "./items/NavItem"
import {
  HomeIcon,
  BookOpenIcon,
  FolderIcon,
  TrashIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import PaddleScript from "./PaddleScript"

function Sidebar() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const user = useUser()

  const onUpgradeClick = () => {
    // if (!isLoggedIn) {
    //   router.push("#login?pricing")
    //   return
    // }

    // setButtonLoading.on()

    const passthrough = {
      userId: user.id
    }

    // window.onPaddleSuccess = function () {
    //   window.location.href = "/purchase"
    // }
    // window.onPaddleClose = function () {
    // setButtonLoading.off()
    // }

    Paddle.Checkout.open({
      product: 44837,
      email: user.email,
      disableLogout: true,
      passthrough: JSON.stringify(passthrough)
      // closeCallback: "onPaddleClose",
      // successCallback: "onPaddleSuccess"
    })
  }

  return (
    <>
      <PaddleScript />

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
              onClick={onUpgradeClick}
            >
              Upgrade
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
