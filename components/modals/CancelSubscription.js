import React, { useState } from "react"
import { NOTE_TYPES } from "../../constants/notes"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router"
import { createNote, deleteNote } from "../../core/notes"
import { deleteFolder } from "../../core/folders"
import Spinner from "../Spinner"
import { useModalContext } from "../../context/ModalContext"
import { toast } from "react-hot-toast"
import { refreshPage } from "../../utils"
import { usePricingContext } from "../../context/PricingContext"

function CancelSubscription() {
  const { showCancelSubscriptionModal, toggleCancelSubscriptionModal } =
    useModalContext()
  const pricingData = usePricingContext()

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showCancelSubscriptionModal ? "modal-open" : null
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-2 font-semibold text-2xl">
          Are you sure you want to cancel your subscription?
        </h3>

        {pricingData.paymentData.subscriptionStatus === "active" && (
          <p className="text-lg mb-3">
            Your subscription will stay active until{" "}
            <span className="font-semibold">
              {pricingData.paymentData.subscriptionEndDate}
            </span>
          </p>
        )}

        <div className="modal-action">
          <button
            className="btn btn-outline"
            onClick={toggleCancelSubscriptionModal}
          >
            Cancel
          </button>
          <button
            onClick={pricingData.cancelSubscription}
            className="btn btn-error"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default CancelSubscription
