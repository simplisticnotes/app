import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async (req, res) => {
  const supabase = createServerSupabaseClient({ req, res })

  const request = req.body

  let passthrough = null

  try {
    passthrough = JSON.parse(request.passthrough)
  } catch {}

  if (!passthrough) {
    res.status(400).send("Invalid passthrough: " + request.passthrough)
    return
  }

  try {
    switch (request.alert_name) {
      case "subscription_created":
        await supabase
          .from("user_payment_data")
          .update({
            subscriptionId: request.subscription_id,
            subscriptionStatus: request.status,
            subscriptionPlanId: request.subscription_plan_id,
            subscriptionEndDate: request.next_bill_date,
            subscriptionUpdateUrl: request.update_url,
            subscriptionCancelUrl: request.cancel_url
          })
          .match({ user_id: passthrough.userId })
        break

      case "subscription_updated":
        await supabase
          .from("user_payment_data")
          .update({
            subscriptionStatus: request.status,
            subscriptionPlanId: request.subscription_plan_id,
            subscriptionEndDate: request.next_bill_date,
            subscriptionUpdateUrl: request.update_url,
            subscriptionCancelUrl: request.cancel_url
          })
          .match({ user_id: passthrough.userId })
        break

      case "subscription_cancelled":
        await supabase
          .from("user_payment_data")
          .update({
            subscriptionStatus: request.status,
            subscriptionEndDate: request.cancellation_effective_date
          })
          .match({ user_id: passthrough.userId })
        break

      case "subscription_payment_succeeded":
        await supabase
          .from("user_payment_data")
          .update({
            subscriptionId: request.subscription_id,
            subscriptionStatus: request.status,
            subscriptionPlanId: request.subscription_plan_id,
            subscriptionEndDate: request.next_bill_date
          })
          .match({ user_id: passthrough.userId })
        break

      case "subscription_payment_failed":
        if (request.next_retry_date) {
          // the user still has access until all payment retries have failed
          await supabase
            .from("user_payment_data")
            .update({
              subscriptionEndDate: request.next_retry_date
            })
            .match({ user_id: passthrough.userId })
        }
        break

      case "subscription_payment_refunded":
        break
    }
  } catch (error) {
    res.status(500).send("Internal server error")
    return
  }

  res.status(200).send("")
}
