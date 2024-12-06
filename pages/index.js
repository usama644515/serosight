import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Hero2 from '../components/Home/Hero2';
import ImmunityTesting from '../components/Home/ImmunityTesting';
import HowItWork from '../components/Home/HowItWork';
import AboutUs from '../components/Home/AboutUs';
import Process from '../components/Home/Process';
import Result from '../components/Home/Result';
import Understand from '../components/Home/Understand';
import Cta from '../components/Home/Cta';
import Head from 'next/head';
import Bottomlines from '@/components/Bottomlines';


const HomePage = () => {
  return (
    <>
    <Head>
        <title>ImmunoMap</title>
      </Head>
      <Header />
      <Hero2 />
      <ImmunityTesting />
      <HowItWork />
      <AboutUs />
      <Process />
      <Result />
      <Understand />
      <Cta />
      <Bottomlines />
      <Footer />
    </>
  );
};

export default HomePage;
