import { useModalContext } from "../../context/ModalContext"
import { ClipboardIcon } from "@heroicons/react/24/outline"
import { useRef } from "react"
import { toast } from "react-hot-toast"

function ShareNote() {
  const { showNoteShareModal, toggleNoteShareModal, shareNoteId } =
    useModalContext()
  const input = useRef(null)

  const copyToClipboard = () => {
    input.current.select()
    document.execCommand("copy")

    toast.success("Copied to clipboard!")
  }

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showNoteShareModal ? "modal-open" : null
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-6 font-semibold text-2xl">Share Note</h3>

        <p className="mb-4 text-gray-500">
          Copy the link below to share this note with others.
        </p>

        <div className="border border-gray-300 rounded-md flex px-4 py-2 gap-2">
          <input
            className="grow focus:outline-none border-r-2 pr-3 border-gray-300"
            type="text"
            value={`${process.env.NEXT_PUBLIC_SITE_URL}/notes/${shareNoteId}`}
            readOnly
            ref={input}
          />

          <ClipboardIcon
            className="w-6 cursor-pointer"
            onClick={copyToClipboard}
          />
        </div>

        <div className="modal-action">
          <button
            className="btn bg-white text-black hover:bg-white"
            onClick={() => toggleNoteShareModal()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShareNote
