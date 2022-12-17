import Image from "next/image";
import React from "react";
import ItemWrapper from "./ItemWrapper";

function NoteItem() {
  return (
    <ItemWrapper>
      <Image src="/note-item.svg" width={50} height={50} alt="Note Name" />
      <p className="font-medium text-lg text-center">Frontend Dev Roadmap</p>
    </ItemWrapper>
  );
}

export default NoteItem;
