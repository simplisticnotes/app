import React from "react";
import Layout from "../../components/Layout";
import NoteItem from "../../components/NoteItem";

function Notes() {
  return (
    <Layout heading="Notes">
      <section>
        <h2 className="text-2xl font-semibold">Your Notes</h2>

        <section className="flex gap-8 mt-7 flex-wrap">
          <NoteItem />
          <NoteItem />
          <NoteItem />
          <NoteItem />
        </section>
      </section>
    </Layout>
  );
}

export default Notes;
