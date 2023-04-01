import {
  HomeIcon,
  BookOpenIcon,
  FolderIcon,
  TrashIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  StarIcon
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { useRouter } from "next/router"
import { useModalContext } from "../context/ModalContext"

const BottomNavItem = ({ icon: Icon, href }) => {
  const router = useRouter()
  const activeLink = router.pathname === href
  return (
    <Link
      href={href}
      className={`grow hover:bg-gray-100 ${
        activeLink && "bg-gray-100"
      } h-full flex items-center justify-center cursor-pointer`}
    >
      <Icon
        className={`w-6 hover:text-primary ${activeLink && "text-primary"}`}
      />
    </Link>
  )
}

const BottomNav = () => {
  const { toggleCreateModal } = useModalContext()

  return (
    <div className="h-16 shadow-[0_-3px_8px_rgba(0,0,0,0.1)] fixed bottom-0 left-0 w-full bg-white flex items-center justify-between sm:hidden">
      <BottomNavItem icon={HomeIcon} href="/app" />
      <BottomNavItem icon={BookOpenIcon} href="/app/notes" />
      <BottomNavItem icon={FolderIcon} href="/app/folders" />
      <BottomNavItem icon={TrashIcon} href="/app/trash" />

      <button
        onClick={toggleCreateModal}
        className="btn btn-primary btn-circle text-6xl absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 shadow-lg active:-translate-x-1/2 active:-translate-y-1/2 "
      >
        +
      </button>
    </div>
  )
}

export default BottomNav
