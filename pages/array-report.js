import Layout from '@/components/Layout';
import Head from 'next/head';
import Hero from '../components/ArrayReport/Hero';
import ResultGraph from '../components/ArrayReport/ResultGraph';
import InfoCards from '../components/ArrayReport/InfoCards';
import VaccineChart from '../components/ArrayReport/VaccineChart';
import Slider from '../components/ArrayReport/Slider';
import Bottomlines from '../components/Bottomlines';

export default function About() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Array Report - ImmunoMap</title>
        </Head>
        <Hero />
        <ResultGraph />
        <InfoCards />
        <VaccineChart />
        <Slider />
        <Bottomlines/>
      </section>
    </Layout>
  );
}
