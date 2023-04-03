import React from "react"
import Logo from "../Logo"
import Link from "next/link"

function Navbar() {
  return (
    <header className="">
      <div className="container max-w-6xl flex items-center justify-between pt-4">
        <Logo imageSize="w-5 sm:w-8" textSize="text-xl sm:text-2xl" />

        <nav className="hidden sm:flex items-center text-xl">
          <a className="mr-5 text-black" href="#features">
            Features
          </a>
          <a className="mr-5 text-black" href="#pricing">
            Pricing
          </a>
        </nav>
        <Link
          href="/signin"
          className="btn btn-primary btn-outline btn-sm sm:btn-lg"
        >
          Get Started
        </Link>
      </div>
    </header>
  )
}

export default Navbar
