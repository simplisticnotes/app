import Image from "next/image"
import React from "react"
import ItemWrapper from "../ItemWrapper"

function FolderItem({ folder }) {
  return (
    <ItemWrapper href={`/app/folders/${folder.id}`}>
      <Image src="/folder-item.svg" width={50} height={50} alt="Folder name" />
      <p className="font-medium text-lg text-center">{folder.name}</p>
    </ItemWrapper>
  )
}

export default FolderItem
