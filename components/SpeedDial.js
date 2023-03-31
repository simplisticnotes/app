import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

const SpeedDial = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div className="absolute right-10 bottom-8 gap-3 flex flex-col">
      {isOpen && (
        <>
          <button className="w-full shadow-md border rounded-full h-12 flex items-center justify-center">
            <PlusIcon className="w-6" />
          </button>

          <button className="w-full shadow-md border rounded-full h-12 flex items-center justify-center">
            <PlusIcon className="w-6" />
          </button>
        </>
      )}

      <button className="btn btn-circle btn-primary" onClick={toggle}>
        {isOpen ? <XMarkIcon className="w-6" /> : <PlusIcon className="w-6" />}
      </button>
    </div>
  )
}

export default SpeedDial
