import Layout from '@/components/Layout';
import Head from 'next/head';
import Hero from '../components/Doctor-Dashboard/Hero';
import DataSelector from '../components/Doctor-Dashboard/DataSelector';
import PatientSelector from '../components/Doctor-Dashboard/PatientSelector';
import Bottomlines from '../components/Bottomlines';

export default function Dcotor_Dashboard() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Dashboard - ImmunoMap</title>
        </Head>
        <Hero />
        <DataSelector />
        <PatientSelector />
        <Bottomlines/>
      </section>
    </Layout>
  );
}
