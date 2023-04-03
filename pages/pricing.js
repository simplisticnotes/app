import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import PaddleScript from "../components/PaddleScript"
import PricingItem from "../components/PricingItem"
import { usePricingContext } from "../context/PricingContext"
import { getUserPaymentData, getUserSession } from "../core/users"
import Link from "next/link"
import Logo from "../components/Logo"
import Seo from "../components/Seo"

function Pricing() {
  const user = useUser()
  const pricingData = usePricingContext()

  return (
    <div className="px-7">
      <Seo
        title="Simplistic Notes Pricing - Affordable Plans for Secure Note-Taking"
        description="Simplistic Notes offers affordable pricing plans to suit your note-taking needs, including a free plan with no credit card required. Choose the plan that's right for you and start taking notes with peace of mind"
      />

      <PaddleScript />

      <Logo className="mt-5" />

      <h1 className="text-6xl font-bold text-center text-primary mt-16 mb-2">
        Pricing
      </h1>

      <p className="text-center mb-8 text-xl">
        Get started for free. No credit card required.
      </p>

      <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
        {user && pricingData.getUserPlan() === "PRO" ? null : (
          <PricingItem plan="FREE" label="STARTER" pricingLabel="FREE" />
        )}

        <PricingItem plan="PRO" label="PRO" pricingLabel="$5 /month" />
      </div>

      {user && (
        <Link
          href="/app"
          className="btn btn-primary text-center mt-10 mb-10 relative left-1/2 -translate-x-1/2"
        >
          Go to the dashboard
        </Link>
      )}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)

  const session = await getUserSession(supabase)
  const { data: paymentData } = await getUserPaymentData(
    supabase,
    session?.user?.id
  )

  // TODO: ERROR HANDLING

  return {
    props: {
      initialSession: session,
      paymentData
    }
  }
}

export default Pricing
