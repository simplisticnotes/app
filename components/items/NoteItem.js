import Image from "next/image";
import React from "react";
import ItemWrapper from "../ItemWrapper";

function NoteItem({ note }) {
  return (
    <ItemWrapper href={`/app/notes/${note.id}`}>
      <Image src="/note-item.svg" width={50} height={50} alt="Note Name" />
      <p className="font-medium text-lg text-center">{note.name}</p>
    </ItemWrapper>
  );
}

export default NoteItem;
