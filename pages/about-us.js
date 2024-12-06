import Layout from '@/components/Layout';
import Head from 'next/head';
import Hero2 from '../components/AboutUs/Hero2';
import Bottomlines from '../components/Bottomlines';
import OurValues from '@/components/AboutUs/OurValues';
import WhatSerosight from '@/components/AboutUs/WhatSerosight';
import AboutCompany from '@/components/AboutUs/AboutCompany';
import Team from '@/components/AboutUs/Team';

export default function About() {
  return (
    <Layout>
      <section>
        <Head>
          <title>About Us - ImmunoMap</title>
        </Head>
        <Hero2 />
        <OurValues />
        <WhatSerosight/>
        <AboutCompany/>
        <Team/>
        <Bottomlines/>
        
      </section>
    </Layout>
  );
}
