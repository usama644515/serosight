import Layout from '@/components/Layout';
import Head from 'next/head';
import Bottomlines from '../components/Bottomlines';
import Hero2 from '../components/ImmunityGuide/Hero2';
import InteractiveSection from '../components/ImmunityGuide/InteractiveSection';
import HowtoUse from '@/components/ImmunityGuide/HowtoUse';
import Cta from '@/components/ImmunityGuide/Cta';

export default function About() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Immunity Guides - ImmunoMap</title>
        </Head>
        <Hero2 />
        <InteractiveSection />
        <HowtoUse/>
        <Cta/>
        <Bottomlines/>
      </section>
    </Layout>
  );
}
