import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { refreshPage } from "../utils"
import { useModalContext } from "./ModalContext"

const PricingContext = createContext()

export const usePricingContext = () => useContext(PricingContext)

export const PricingContextProvider = ({
  children,
  paymentData: initialPaymentData
}) => {
  const [paymentData, setPaymentData] = useState(initialPaymentData)

  const router = useRouter()
  const user = useUser()
  const { toggleCancelSubscriptionModal } = useModalContext()

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
      product: Number(process.env.NEXT_PUBLIC_PADDLE_PRODUCT_ID),
      email: user.email,
      disableLogout: true,
      passthrough: JSON.stringify(passthrough),
      closeCallback: "onPaddleClose",
      successCallback: "onPaddleSuccess"
    })
  }

  const updatePaymentMethod = () => {
    window.onPaddleSuccess = function () {
      refreshPage(router)
      toast.success("Your payment method is updated successfully")
      // authStore.fetchUserData()
    }
    window.onPaddleClose = function () {
      // TODO: DO SOMETHING
    }

    Paddle.Checkout.open({
      override: paymentData.subscriptionUpdateUrl,
      successCallback: "onPaddleSuccess",
      closeCallback: "onPaddleClose"
    })
  }

  const cancelSubscription = () => {
    window.onPaddleSuccess = function () {
      refreshPage(router)
      toast.success("Your subscription is cancelled successfully")
      toggleCancelSubscriptionModal()
      // authStore.fetchUserData()
    }
    window.onPaddleClose = function () {
      // TODO: DO SOMETHING
    }

    Paddle.Checkout.open({
      override: paymentData.subscriptionCancelUrl,
      successCallback: "onPaddleSuccess",
      closeCallback: "onPaddleClose"
    })
  }

  const value = {
    paymentData,
    setPaymentData,
    getUserPlan,
    startCheckoutProcess,
    updatePaymentMethod,
    cancelSubscription
  }

  return (
    <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
  )
}
