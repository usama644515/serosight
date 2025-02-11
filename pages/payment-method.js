import Layout from '@/components/Layout';
import Head from 'next/head';
import Bottomlines from '../components/Bottomlines';
import PaymentForm from '../components/Profile-Setting/PaymentForm';

export default function PaymentMethod() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Payment Method - ImmunoMap</title>
        </Head>
        <PaymentForm />
        <Bottomlines/>
      </section>
    </Layout>
  );
}
