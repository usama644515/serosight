import Layout from "@/components/Layout";
import Head from "next/head";
import Hero2 from "../components/HowItWorks/Hero2";
import Process from "../components/HowItWorks/Process";
import Bottomlines from "../components/Bottomlines";
import SampleReceipt from "@/components/HowItWorks/SampleReceipt";
import BloodTesting from "@/components/HowItWorks/BloodTesting";
import DataAnalysis from "@/components/HowItWorks/DataAnalysis";
import QualityControl from "@/components/HowItWorks/QualityControl";
import Cta from '../components/Home/Cta';

export default function HowItWorks() {
  return (
    <Layout>
      <section>
        <Head>
          <title>How it Works - ImmunoMap</title>
        </Head>
        <Hero2 />
        <Process />
        <SampleReceipt />
        <BloodTesting />
        <DataAnalysis/>
        <QualityControl/>
        <Cta />
        <Bottomlines />
      </section>
    </Layout>
  );
}
