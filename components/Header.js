import React from "react";

function Header({ heading }) {
  return (
    <header className="bg-secondary w-full py-4 font-semibold">
      <h2 className="text-center text-xl">{heading}</h2>
    </header>
  );
}

export default Header;
