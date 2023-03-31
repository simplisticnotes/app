import React from "react"
import Logo from "../Logo"

function Navbar() {
  return (
    <header className="text-gray-600">
      <div className="container max-w-7xl flex flex-wrap flex-col md:flex-row items-center pt-4">
        <Logo imageSize="w-8" textSize="text-2xl" />

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center text-xl">
          <a className="mr-5 text-black" href="#">
            Features
          </a>
          <a className="mr-5 text-black" href="#">
            Pricing
          </a>
          <a className="mr-5 text-black" href="#">
            Third Link
          </a>
          <a className="mr-5 text-black" href="#">
            Fourth Link
          </a>
        </nav>
        <button className="btn btn-primary btn-outline btn-lg">
          Get Started
        </button>
      </div>
    </header>
  )
}

export default Navbar
