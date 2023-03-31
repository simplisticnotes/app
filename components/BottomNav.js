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

const BottomNavItem = ({ icon: Icon, href }) => {
  const router = useRouter()
  const activeLink = router.pathname === href
  return (
    <Link
      href={href}
      className={`grow ${
        activeLink && "bg-gray-100"
      } h-full flex items-center justify-center cursor-pointer`}
    >
      <Icon className={`w-6 ${activeLink && "text-primary"}`} />
    </Link>
  )
}

const BottomNav = () => {
  return (
    <div className="h-16 shadow-[0_-3px_8px_rgba(0,0,0,0.1)] fixed bottom-0 left-0 w-full bg-white flex items-center justify-between sm:hidden">
      <BottomNavItem icon={HomeIcon} href="/app" />
      <BottomNavItem icon={BookOpenIcon} href="/app/notes" />
      <BottomNavItem icon={FolderIcon} href="/app/folders" />
      <BottomNavItem icon={TrashIcon} href="/app/trash" />
    </div>
  )
}

export default BottomNav
