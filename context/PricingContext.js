import { createContext, useContext, useEffect, useState } from "react"
import { useUser } from "../node_modules/@supabase/auth-helpers-react/dist/index"
import { useRouter } from "../node_modules/next/router"

const PricingContext = createContext()

export const usePricingContext = () => useContext(PricingContext)

export const PricingContextProvider = ({
  children,
  paymentData: initialPaymentData
}) => {
  const [paymentData, setPaymentData] = useState(initialPaymentData)

  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    setPaymentData(initialPaymentData)
  }, [initialPaymentData])

  const getUserPlan = () => {
    if (
      paymentData?.subscriptionStatus === "active" ||
      paymentData?.subscriptionStatus === "trialing"
    ) {
      return "PRO"
    }

    return "FREE"
  }

  const startCheckoutProcess = () => {
    if (!user) {
      router.push("/signin")
      return
    }

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

  const value = {
    paymentData,
    setPaymentData,
    getUserPlan,
    startCheckoutProcess
  }

  return (
    <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
  )
}
