import Layout from '@/components/Layout';
import Head from 'next/head';
import Bottomlines from '../components/Bottomlines';
import OrderHistory from '../components/Profile-Setting/OrderHistory';

export default function Orderhistory() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Order History - ImmunoMap</title>
        </Head>
        <OrderHistory />
        <Bottomlines/>
      </section>
    </Layout>
  );
}
