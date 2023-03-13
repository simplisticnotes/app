import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import React from "react"
import PaddleScript from "../components/PaddleScript"
import PricingItem from "../components/PricingItem"
import { getUserPaymentData, getUserSession } from "../core/users"

function Pricing({ paymentData }) {
  const user = useUser()
  const router = useRouter()

  console.log("PAYMENT DATA", paymentData)

  const showCheckoutModal = () => {
    if (!user) {
      router.push("/signin")
      return
    }

    // setButtonLoading.on()

    const passthrough = {
      userId: user.id
    }

    window.onPaddleSuccess = function () {
      router.push("/payment-success")
    }

    window.onPaddleClose = function () {
      // TODO: DO SOMETHING
    }

    Paddle.Checkout.open({
      product: 44837,
      email: user.email,
      disableLogout: true,
      passthrough: JSON.stringify(passthrough),
      closeCallback: "onPaddleClose",
      successCallback: "onPaddleSuccess"
    })
  }

  return (
    <>
      <PaddleScript />

      <h1 className="text-6xl font-bold text-center text-primary mt-16 mb-8">
        Pricing
      </h1>

      <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
        {user &&
        (paymentData.subscriptionStatus === "active" ||
          paymentData.subscriptionStatus === "trialing") ? null : (
          <PricingItem
            plan="FREE"
            label="STARTER"
            pricingLabel="FREE"
            user={user}
            paymentData={paymentData}
            onUpgrade={showCheckoutModal}
          />
        )}

        <PricingItem
          plan="PRO"
          label="PRO"
          pricingLabel="$5 /month"
          user={user}
          paymentData={paymentData}
          onUpgrade={showCheckoutModal}
        />
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)

  const session = await getUserSession(supabase)
  const { data } = await getUserPaymentData(supabase, session?.user?.id)

  // TODO: ERROR HANDLING

  return {
    props: {
      initialSession: session,
      paymentData: data
    }
  }
}

export default Pricing
