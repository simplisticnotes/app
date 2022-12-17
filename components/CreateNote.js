import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { noteTypes } from "../utils";
import { NotificationManager } from "react-notifications";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

function CreateNote() {
  const { showCreateNoteModal, setShowCreateNoteModal } = useAppContext();
  const [name, setName] = useState("Untitled");
  const [type, setType] = useState(noteTypes[0]);
  const supabase = useSupabaseClient();
  const user = useUser();

  const changeName = (e) => setName(e.target.value);
  const changeType = (e) => setType(e.target.value);

  const createNoteHandler = async () => {
    if (!name.trim().length) {
      NotificationManager.error("Please enter the name!");
      return;
    }

    const { error } = await supabase.from("notes").insert({
      name,
      type,
      user_id: user.id,
    });

    console.log(error);
  };

  return (
    <div
      className={[
        "modal modal-bottom sm:modal-middle",
        showCreateNoteModal ? "modal-open" : null,
      ].join(" ")}
    >
      <div className="modal-box">
        <h3 className="mb-6 font-semibold text-2xl">Create Note</h3>

        <div className="flex flex-col text-xl gap-2">
          <label htmlFor="note-name">Name</label>
          <input
            id="note-name"
            placeholder="Name of the note..."
            className="outline-none border-b-2 border-black"
            value={name}
            onChange={changeName}
          />
        </div>

        <div className="flex flex-col text-xl gap-2 mt-8">
          <label htmlFor="note-name">Type</label>

          <select
            className="select select-bordered text-xl"
            value={type}
            onChange={changeType}
          >
            {noteTypes.map((noteType, i) => (
              <option value={noteType} key={i}>
                {noteType}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-action">
          <button
            className="btn bg-white text-black hover:bg-white"
            onClick={() => setShowCreateNoteModal(false)}
          >
            Cancel
          </button>
          <button
            onClick={createNoteHandler}
            className="btn bg-primary hover:bg-primary"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNote;
