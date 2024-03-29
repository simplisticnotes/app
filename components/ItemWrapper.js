import Link from "next/link"
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  ShareIcon,
  ArrowUpOnSquareIcon
} from "@heroicons/react/24/outline"
import Dropdown from "./Dropdown"
import DropdownItem from "./Dropdown/DropdownItem"
import { usePricingContext } from "../context/PricingContext"

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
  const pricingData = usePricingContext()

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
            disabled={pricingData.getUserPlan() === "FREE"}
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
    "relative gap-3 xs:w-48 w-full  flex flex-col items-center py-4 px-2 cursor-pointer shadow hover:shadow-lg hover:border-2 hover:border-primary border border-slate-200",
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
