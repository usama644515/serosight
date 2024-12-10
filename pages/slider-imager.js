import Layout from '@/components/Layout';
import Head from 'next/head';
import Hero2 from '../components/SliderImager/Hero2';
import HowItWorks from '../components/SliderImager/HowitWorks';
import LyraSection from '../components/SliderImager/LyraSection';
import LyraComparison from '../components/SliderImager/LyraComparison';
import Form from '../components/SliderImager/Form';
import Slider from '../components/SliderImager/Slider';
import Bottomlines from '../components/Bottomlines';


export default function About() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Slider Imager - ImmunoMap</title>
        </Head>
        <Hero2 />
        <HowItWorks />
        <LyraSection />
        <Slider />
        <LyraComparison />
        <Form />
        <Bottomlines/>
      </section>
    </Layout>
  );
}
