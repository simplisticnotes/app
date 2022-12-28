import "react-notifications/lib/notifications.css"
import "../styles/globals.css"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { useState } from "react"
import { ModalContextProvider } from "../context/ModalContext"
import { NotificationContainer } from "react-notifications"

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ModalContextProvider>
        <Component {...pageProps} />

        <NotificationContainer />
      </ModalContextProvider>
    </SessionContextProvider>
  )
}
export default MyApp
