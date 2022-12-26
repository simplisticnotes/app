import Image from "next/image";
import React from "react";
import ItemWrapper from "../ItemWrapper";

function FolderItem() {
  return (
    <ItemWrapper>
      <Image src="/folder-item.svg" width={50} height={50} alt="Folder name" />
      <p className="font-medium text-lg text-center">Frontend Dev Roadmap</p>
    </ItemWrapper>
  );
}

export default FolderItem;
