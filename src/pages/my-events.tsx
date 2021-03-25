import { SimpleGrid } from "@chakra-ui/layout";
import Head from "next/head";

import { useMeQuery } from "~/types/frontend";
import Layout from "../components/Layout";
import Event from "../components/Event";

const MyEvents = () => {
  const { data, loading } = useMeQuery();

  const events = loading ? (
    <div>loading...</div>
  ) : data.me.createdEvents.length ? (
    data.me.createdEvents.map((event) => (
      <Event key={event.id} event={event} me />
    ))
  ) : (
    <h1></h1>
  );

  return (
    <Layout>
      <Head>
        <title>events</title>
      </Head>
      <SimpleGrid columns={[1, 1, 2]} spacing={3}>
        {events}
      </SimpleGrid>
    </Layout>
  );
};

export default MyEvents;
