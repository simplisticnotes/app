import "../styles/globals.css"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { useState } from "react"
import { ModalContextProvider } from "../context/ModalContext"
import { Toaster } from "react-hot-toast"
import { PricingContextProvider } from "../context/PricingContext"

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ModalContextProvider>
        <PricingContextProvider paymentData={pageProps.paymentData}>
          <Component {...pageProps} />
        </PricingContextProvider>
      </ModalContextProvider>

      <Toaster />
    </SessionContextProvider>
  )
}
export default MyApp
