import Layout from '@/components/Layout';
import Head from 'next/head';
import Hero2 from '../components/Shop/Hero2';
import Insights from '../components/Shop/Insights';
import TestSelection from '../components/Shop/TestSelection';
import BundleSection from '../components/Shop/BundleSection';
import Bottomlines from '../components/Bottomlines';

export default function About() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Shop - ImmunoMap</title>
        </Head>
        <Hero2 />
        <TestSelection />;
        <BundleSection />;
        <Insights />
        <Bottomlines/>
      </section>
    </Layout>
  );
}
