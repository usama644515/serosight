import Layout from '@/components/Layout';
import Head from 'next/head';
import Hero from '../components/Dashboard/Hero';
import Overview from '../components/Dashboard/Overview';
import Overview2 from '../components/Dashboard/Overview2';
import OrderProgress from '../components/Dashboard/OrderProgress';
import OrderHistory from '../components/Dashboard/OrderHistory';
import AccountSettings from '../components/Dashboard/AccountSettings';
import Bottomlines from '../components/Bottomlines';

export default function About() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Dashboard - ImmunoMap</title>
        </Head>
        <Hero />
        <Overview />
        <Overview2 />
        <OrderProgress />
        <OrderHistory />
        <AccountSettings />
        <Bottomlines/>
      </section>
    </Layout>
  );
}
