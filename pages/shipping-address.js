import Layout from "@/components/Layout";
import Head from "next/head";
import Bottomlines from "../components/Bottomlines";
import ShippingAddress from "../components/Profile-Setting/ShippingAddress";

export default function shippingaddress() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Shipping Address - ImmunoMap</title>
        </Head>
        <ShippingAddress />
        <Bottomlines />
      </section>
    </Layout>
  );
}
