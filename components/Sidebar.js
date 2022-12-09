import React from "react";

function Sidebar() {
  return (
    <div className="w-48 bg-secondary h-screen static">
      <div className="border-b-2 pt-2 pb-3 border-white">
        <img
          src="logo.svg"
          alt="Simplistic Notes Logo"
          className="w-6 block mx-auto"
        />
      </div>
    </div>
  );
}

export default Sidebar;
