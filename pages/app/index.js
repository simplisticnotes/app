import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";
import CreateItem from "../../components/CreateItem";
import CreateNote from "../../components/CreateNote";
import FolderItem from "../../components/FolderItem";
import Layout from "../../components/Layout";
import NoteItem from "../../components/NoteItem";
import { useAppContext } from "../../context/AppContext";

function App() {
  const { setShowCreateNoteModal } = useAppContext();
  const supabase = useSupabaseClient();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("notes").select("*");

      console.log(error);
      console.log(data);
    })();
  }, []);

  return (
    <Layout heading="Dashboard">
      <section>
        <h2 className="text-2xl font-semibold">Recent Notes</h2>

        <section className="flex gap-8 mt-7 flex-wrap">
          <NoteItem />
          <NoteItem />
          <NoteItem />
          <NoteItem />

          <CreateItem onClick={() => setShowCreateNoteModal(true)} />
        </section>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold">Recent Folders</h2>

        <section className="flex gap-8 mt-7 flex-wrap">
          <FolderItem />
          <FolderItem />
          <FolderItem />
          <FolderItem />

          <CreateItem />
        </section>
      </section>

      <CreateNote />
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    props: {
      initialSession: session,
    },
  };
};

export default App;
