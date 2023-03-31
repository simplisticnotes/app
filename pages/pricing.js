import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import PaddleScript from "../components/PaddleScript"
import PricingItem from "../components/PricingItem"
import { usePricingContext } from "../context/PricingContext"
import { getUserPaymentData, getUserSession } from "../core/users"
import Link from "next/link"
import Logo from "../components/Logo"

function Pricing() {
  const user = useUser()
  const pricingData = usePricingContext()

  return (
    <div className="px-7">
      <PaddleScript />

      <Logo className="mt-5" />

      <h1 className="text-6xl font-bold text-center text-primary mt-16 mb-8">
        Pricing
      </h1>

      <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
        {user && pricingData.getUserPlan() === "PRO" ? null : (
          <PricingItem
            plan="FREE"
            label="STARTER"
            pricingLabel="FREE"
            onUpgrade={pricingData.startCheckoutProcess}
          />
        )}

        <PricingItem
          plan="PRO"
          label="PRO"
          pricingLabel="$5 /month"
          onUpgrade={pricingData.startCheckoutProcess}
        />
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
