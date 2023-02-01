import Image from "next/image"
import ItemWrapper from "../ItemWrapper"
import { useModalContext } from "../../context/ModalContext"

function FolderItem({ folder }) {
  const { toggleDeleteItemModal } = useModalContext()

  return (
    <ItemWrapper
      href={`/app/folders/${folder.id}`}
      onDelete={() => {
        toggleDeleteItemModal(folder.id, "Folder")
      }}
    >
      <Image src="/folder-item.svg" width={50} height={50} alt="Folder name" />
      <p className="font-medium text-lg text-center">{folder.name}</p>
    </ItemWrapper>
  )
}

export default FolderItem
