import Link from "next/link"
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  ShareIcon,
  ArrowUpOnSquareIcon
} from "@heroicons/react/24/outline"

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
  const content = (
    <>
      <div className="dropdown absolute top-0 right-2">
        <label
          tabIndex={0}
          className="cursor-pointer"
          onClick={(e) => {
            // avoid the above link from opening
            e.preventDefault()
          }}
        >
          <EllipsisHorizontalIcon className="w-6 hover:bg-slate-200 rounded-full" />
        </label>

        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow-lg border-2 border-primary bg-base-100 rounded w-32"
        >
          {onShare && (
            <li
              className="flex items-center flex-row gap-2 text-primary hover:bg-slate-200 p-2 rounded"
              onClick={(e) => {
                e.preventDefault()
                onShare()
              }}
            >
              <ShareIcon className="w-4 p-0" /> Share
            </li>
          )}

          {onDelete && (
            <li
              className="flex items-center flex-row gap-2 text-primary hover:bg-slate-200 p-2 rounded"
              onClick={(e) => {
                e.preventDefault()
                onDelete()
              }}
            >
              <TrashIcon className="w-4 p-0" /> Delete
            </li>
          )}

          {onRestore && (
            <li
              className="flex items-center flex-row gap-2 text-primary hover:bg-slate-200 p-2 rounded"
              onClick={(e) => {
                e.preventDefault()
                onRestore()
              }}
            >
              <ArrowUpOnSquareIcon className="w-4 p-0" /> Restore
            </li>
          )}

          {onDeleteTrash && (
            <li
              className="flex items-center flex-row gap-2 text-primary hover:bg-slate-200 p-2 rounded"
              onClick={(e) => {
                e.preventDefault()
                onDeleteTrash()
              }}
            >
              <TrashIcon className="w-4 p-0" /> Delete
            </li>
          )}
        </ul>
      </div>

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
