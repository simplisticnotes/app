import React from "react";

function ItemWrapper({ children }) {
  return (
    <div className="gap-3 w-48 flex flex-col items-center p-2 cursor-pointer shadow-md hover:shadow-lg hover:border-primary border-white border-2">
      {children}
    </div>
  );
}

export default ItemWrapper;
