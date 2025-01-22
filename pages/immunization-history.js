import Layout from '@/components/Layout';
import Head from 'next/head';
import Bottomlines from '../components/Bottomlines';
import ImmunizationHistory from '../components/Profile-Setting/ImmunizationHistory';

export default function Immunizationhistory() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Immunization History - ImmunoMap</title>
        </Head>
        <ImmunizationHistory />
        <Bottomlines/>
      </section>
    </Layout>
  );
}
