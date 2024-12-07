import Layout from '@/components/Layout';
import Head from 'next/head';
import Bottomlines from '../components/Bottomlines';
import PaymentForm from '../components/Order/PaymentForm';

export default function About() {
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
