import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useState } from "react"
import Breadcrumb from "../../components/Breadcrumb"
import Layout from "../../components/Layout"
import {
  getUserPaymentData,
  getUserSession,
  updateUser
} from "../../core/users"
import Spinner from "../../components/Spinner"
import { toast } from "react-hot-toast"
import { usePricingContext } from "../../context/PricingContext"
import { StarIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import PaddleScript from "../../components/PaddleScript"
import { useModalContext } from "../../context/ModalContext"
import CancelSubscription from "../../components/modals/CancelSubscription"
import CreateNote from "../../components/modals/CreateNote"

function Profile() {
  const user = useUser()
  const supabase = useSupabaseClient()
  const pricingData = usePricingContext()
  const { toggleCancelSubscriptionModal } = useModalContext()

  console.log(pricingData.paymentData)

  const [fullName, setFullName] = useState(user.user_metadata?.full_name)
  const [loading, setLoading] = useState(false)

  const updateUserHandler = async () => {
    setLoading(true)

    await updateUser(supabase, { full_name: fullName })

    setLoading(false)

    toast.success("Profile updated successfully!")
  }

  return (
    <>
      <PaddleScript />
      <Layout heading="Notes">
        <Breadcrumb
          links={[{ href: "/app", title: "Dashboard" }, { title: "Profile" }]}
        />

        <section>
          <h2 className="text-2xl font-semibold">Profile</h2>

          <section>
            <h3 className="text-xl font-semibold mt-8">Personal Information</h3>
            <p className="text-gray-600">
              Provide your name and email so we can get in touch with you.
            </p>

            <div className="flex flex-wrap gap-8 max-w-2xl mt-4">
              <div className="form-control grow">
                <label className="label">
                  <span className="label-text text-lg">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Type your name..."
                  className="input input-bordered shadow"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="form-control grow">
                <label className="label">
                  <span className="label-text text-lg">Your Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Type your email..."
                  className="input input-bordered shadow"
                  value={user.email}
                  disabled
                />
              </div>
            </div>

            <button
              className="btn btn-outline btn-primary mt-5 gap-2"
              onClick={updateUserHandler}
              disabled={loading}
            >
              {loading && <Spinner />}
              Save Changes
            </button>
          </section>

          <section>
            <h3 className="text-xl font-semibold mt-8">
              Membership Information
            </h3>
            <p className="text-lg mt-3">
              Current Plan:{" "}
              <span className="font-semibold">{pricingData.getUserPlan()}</span>
            </p>

            {pricingData.getUserPlan() === "FREE" ? (
              <Link
                href="/pricing"
                className="btn btn-primary btn-outline gap-2 mt-2"
              >
                <StarIcon className="w-4 -mt-1" /> Upgrade Now
              </Link>
            ) : (
              <>
                <p className="text-lg">
                  Subscription status:{" "}
                  <span className="font-semibold">
                    {pricingData.paymentData.subscriptionStatus.toUpperCase()}
                  </span>
                </p>

                <p className="text-lg">
                  Next billing date:{" "}
                  <span className="font-semibold">
                    {pricingData.paymentData.subscriptionEndDate.toUpperCase()}
                  </span>
                </p>

                <div className="flex gap-4 flex-wrap mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={pricingData.updatePaymentMethod}
                  >
                    Update Payment Method
                  </button>
                  <button
                    className="btn btn-error btn-outline"
                    onClick={toggleCancelSubscriptionModal}
                  >
                    Cancel Subscription
                  </button>
                </div>
              </>
            )}
          </section>
        </section>
      </Layout>

      <CancelSubscription />
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)

  const session = await getUserSession(supabase)

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false
      }
    }
  }

  const { data: paymentData } = await getUserPaymentData(
    supabase,
    session.user.id
  )

  // TODO: Handle error

  return {
    props: {
      initialSession: session,
      paymentData
    }
  }
}

export default Profile
