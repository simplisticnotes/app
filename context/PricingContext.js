import { createContext, useContext, useEffect, useState } from "react"

const PricingContext = createContext()

export const usePricingContext = () => useContext(PricingContext)

export const PricingContextProvider = ({
  children,
  paymentData: initialPaymentData
}) => {
  const [paymentData, setPaymentData] = useState(initialPaymentData)

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

  const value = {
    paymentData,
    setPaymentData,
    getUserPlan
  }

  return (
    <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
  )
}
