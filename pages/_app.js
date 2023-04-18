import "../styles/globals.css"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { useState } from "react"
import { ModalContextProvider } from "../context/ModalContext"
import { Toaster } from "react-hot-toast"
import { PricingContextProvider } from "../context/PricingContext"
import { NoteContextProvider } from "../context/NoteContext"
import { FolderContextProvider } from "../context/FolderContext"

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ModalContextProvider>
        <PricingContextProvider paymentData={pageProps.paymentData}>
          <NoteContextProvider
            notes={pageProps.notes}
            trashNotes={pageProps.trashNotes}
          >
            <FolderContextProvider folders={pageProps.folders}>
              <Component {...pageProps} />
            </FolderContextProvider>
          </NoteContextProvider>
        </PricingContextProvider>
      </ModalContextProvider>

      <Toaster />
    </SessionContextProvider>
  )
}
export default MyApp
