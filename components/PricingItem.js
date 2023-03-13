import { PRICING_OPTIONS } from "../constants/pricing"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"

function PricingItem({
  plan,
  label,
  pricingLabel,
  user,
  paymentData,
  onUpgrade
}) {
  console.log(paymentData)

  let buttonText = "Get Started"

  const isCurrentPlan =
    (user &&
      plan === "FREE" &&
      (!paymentData.subscriptionStatus ||
        paymentData.subscriptionStatus === "deleted")) ||
    (user &&
      plan === "PRO" &&
      (paymentData.subscriptionStatus === "active" ||
        paymentData.subscriptionStatus === "trialing"))

  if (isCurrentPlan) {
    buttonText = "Current Plan"
  }

  if (
    user &&
    plan === "PRO" &&
    (!paymentData.subscriptionStatus ||
      paymentData.subscriptionStatus === "deleted")
  ) {
    buttonText = "Upgrade"
  }

  return (
    <div className="shadow-lg p-5 rounded-lg border-t-4 border-primary bg-white">
      <p className="uppercase text-sm font-medium text-gray-500">{label}</p>

      <p className="mt-4 text-3xl text-gray-700 font-medium">{pricingLabel}</p>

      <div className="mt-8">
        <ul className="grid grid-cols-1 gap-4">
          {PRICING_OPTIONS.map((PRICING_OPTION) => (
            <li
              key={PRICING_OPTION.title}
              className="inline-flex gap-2 items-center text-gray-600"
            >
              {PRICING_OPTION.plans.includes(plan) ? (
                <CheckCircleIcon className="w-5 h-5 text-primary" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-gray-300" />
              )}

              {PRICING_OPTION.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <button
          disabled={isCurrentPlan}
          onClick={onUpgrade}
          className={`${
            isCurrentPlan
              ? "bg-gray-500"
              : "bg-primary hover:bg-gray-800 active:bg-primary"
          } px-3 py-2 rounded-lg w-full text-white`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default PricingItem
