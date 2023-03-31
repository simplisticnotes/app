import Link from "next/link"
import React from "react"

function Logo({ className, imageSize, textSize }) {
  return (
    <Link
      href="/"
      className={["flex items-center justify-center", className].join(" ")}
    >
      <img
        className={`${imageSize || "w-5"}`}
        src="/logo.svg"
        alt="Simplistic Notes Logo"
      />
      <p className={`font-bold ${textSize || "text-xl"}`}>
        <span className="hidden">S</span>implistic Notes
      </p>
    </Link>
  )
}

export default Logo
