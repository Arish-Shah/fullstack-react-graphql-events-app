import Layout from "../components/Layout";
import { useEventsQuery } from "~/types/frontend";
import { SimpleGrid } from "@chakra-ui/layout";
import Head from "next/head";

import Event from "../components/Event";

const Home = () => {
  const { data, loading } = useEventsQuery();

  const events = loading ? (
    <div>loading...</div>
  ) : data.events.length ? (
    data.events.map((event) => <Event key={event.id} event={event} />)
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

export default Home;
