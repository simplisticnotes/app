import React from "react"

function CreateItem({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="border-8 flex items-center justify-center text-6xl text-secondary cursor-pointer border-secondary xs:w-48 w-full min-h-[8rem]"
    >
      +
    </div>
  )
}

export default CreateItem
