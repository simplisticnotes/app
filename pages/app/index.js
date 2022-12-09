import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";
import Layout from "../../components/Layout";

function App() {
  const user = useUser();

  useEffect(() => {
    console.log(user);
  }, []);

  return <Layout heading="Dashboard">index</Layout>;
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
