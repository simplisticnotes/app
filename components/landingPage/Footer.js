import Link from "next/link"

function Footer() {
  return (
    <footer className="bg-gray-800 py-10">
      <div className="container max-w-6xl px-4">
        <div className="flex gap-20 pb-10 pt-5 sm:flex-row flex-col justify-between">
          <div className="text-gray-200 flex flex-col items-center gap-2">
            <h3 className="text-2xl font-semibold">Pages</h3>

            <Link href="/" className="text-gray-400 hover:text-white">
              Home
            </Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white">
              Pricing
            </Link>
            <Link href="/signin" className="text-gray-400 hover:text-white">
              Signin
            </Link>
          </div>

          <div className="text-gray-200 flex flex-col items-center gap-2">
            <h3 className="text-2xl font-semibold">Legal</h3>

            <a
              href="/terms-of-service"
              className="text-gray-400 hover:text-white"
              target="_blank"
            >
              Terms of Service
            </a>
            <a
              href="/refund-policy"
              className="text-gray-400 hover:text-white"
              target="_blank"
            >
              Refund Policy
            </a>
          </div>

          <div className="text-gray-200 flex flex-col items-center gap-2">
            <h3 className="text-2xl font-semibold">Contact</h3>

            <a
              href="mailto:shahmir@simplisticnotes.com"
              className="text-gray-400 hover:text-white"
            >
              shahmir@simplisticnotes.com
            </a>
            <a
              href="tel:+923231534908"
              className="text-gray-400 hover:text-white"
            >
              +923231534908
            </a>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-12/12 px-4">
            <div className="flex justify-center mt-6">
              <div className="text-gray-400">
                © {new Date().getFullYear()} Simplistic Notes. All rights
                reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
