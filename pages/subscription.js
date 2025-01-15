import Layout from "@/components/Layout";
import Head from "next/head";
import Bottomlines from "../components/Bottomlines";
import SubscriptionPage from "../components/Profile-Setting/SubscriptionPage";

export default function Subscription() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Subscription - ImmunoMap</title>
        </Head>
        <SubscriptionPage />
        <Bottomlines />
      </section>
    </Layout>
  );
}
