import Layout from "@/components/Layout";
import Head from "next/head";
import Bottomlines from "../components/Bottomlines";
import SubscriptionPage from "../components/Profile-Setting/SubscriptionPage";
import ManageSubscription from "../components/Profile-Setting/ManageSubscription";

export default function Subscription() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Subscription - ImmunoMap</title>
        </Head>
        <SubscriptionPage />
        <ManageSubscription />
        <Bottomlines />
      </section>
    </Layout>
  );
}
