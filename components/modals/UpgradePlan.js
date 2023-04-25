import React from "react"
import { useModalContext } from "../../context/ModalContext"
import Link from "next/link"

function UpgradePlan() {
  const { showUpgradeModal, toggleUpgradeModal } = useModalContext()

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showUpgradeModal ? "modal-open" : null
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-2 font-semibold text-2xl">
          Upgrade your plan to use this feature!
        </h3>

        <div className="modal-action">
          <button className="btn btn-outline" onClick={toggleUpgradeModal}>
            Cancel
          </button>
          <Link href="/pricing" className="btn btn-primary">
            Upgrade
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UpgradePlan
