import React from "react";

function CreateItem({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="border-8 flex items-center justify-center text-6xl text-secondary cursor-pointer border-secondary w-48"
    >
      +
    </div>
  );
}

export default CreateItem;
