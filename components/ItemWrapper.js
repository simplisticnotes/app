import Link from "next/link"
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  ShareIcon,
  ArrowUpOnSquareIcon
} from "@heroicons/react/24/outline"
import Dropdown from "./Dropdown"
import DropdownItem from "./Dropdown/DropdownItem"

function ItemWrapper({
  children,
  href,
  disabled,
  className,
  onDelete,
  onShare,
  onRestore,
  onDeleteTrash
}) {
  const dropdownItemClickHandler = (doSomething) => {
    return (e) => {
      e.preventDefault()
      doSomething()
    }
  }

  const content = (
    <>
      <Dropdown className="absolute top-0 right-2">
        {onShare && (
          <DropdownItem
            icon={ShareIcon}
            label="Share"
            onClick={dropdownItemClickHandler(onShare)}
          />
        )}

        {onDelete && (
          <DropdownItem
            icon={TrashIcon}
            label="Delete"
            onClick={dropdownItemClickHandler(onDelete)}
          />
        )}

        {onRestore && (
          <DropdownItem
            icon={ArrowUpOnSquareIcon}
            label="Restore"
            onClick={dropdownItemClickHandler(onRestore)}
          />
        )}

        {onDeleteTrash && (
          <DropdownItem
            icon={TrashIcon}
            label="Delete"
            onClick={dropdownItemClickHandler(onDeleteTrash)}
          />
        )}
      </Dropdown>

      {children}
    </>
  )

  const styling = [
    "relative gap-3 xs:w-48 w-full  flex flex-col items-center py-4 px-2 cursor-pointer shadow-md hover:shadow-lg hover:border-primary border-white border-2",
    className
  ].join(" ")

  return disabled ? (
    <div className={styling}>{content}</div>
  ) : (
    <Link href={href || "#"} className={styling}>
      {content}
    </Link>
  )
}

export default ItemWrapper
