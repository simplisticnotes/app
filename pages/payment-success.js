import Link from "next/link"
import { useEffect } from "react"

function PaymentSuccess() {
  useEffect(() => {
    import("@lottiefiles/lottie-player")
  })

  return (
    <section className="shadow mt-10 p-4 max-w-3xl flex flex-col mx-auto items-center">
      <lottie-player
        src="https://assets7.lottiefiles.com/packages/lf20_pBawUjQ12v.json"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }}
        loop
        autoplay
      ></lottie-player>

      <h2 className="text-3xl font-bold text-center">
        You have successfully upgraded your plan!
      </h2>

      <p className="text-lg mt-3 text-center">
        Thank you for upgrading your plan! Now you will have access to all the
        features of Simplistic Notes. It will take a little time to have full
        access, so your patience will be highly appreciated.
      </p>

      <Link href="/app" className="btn btn-primary mt-4">
        Go to the dashboard
      </Link>
    </section>
  )
}

export default PaymentSuccess
