import Layout from '@/components/Layout';
import Head from 'next/head';
import Bottomlines from '../components/Bottomlines';
import OrderTracking from '../components/Dashboard/OrderTracking';
import { useRouter } from 'next/router';

export default function Ordertracking() {
  const router = useRouter();
  const { orderId } = router.query; // Retrieve the orderId from the URL query

  return (
    <Layout>
      <section>
        <Head>
          <title>Order Tracking - ImmunoMap</title>
        </Head>
        {/* Pass the orderId as a prop to OrderTracking */}
        {orderId ? <OrderTracking orderId={orderId} /> : <div>Loading...</div>}
        <Bottomlines />
      </section>
    </Layout>
  );
}
