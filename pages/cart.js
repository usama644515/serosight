import Layout from '@/components/Layout';
import Head from 'next/head';
import Cart from '../components/Cart/Cart';
import Bottomlines from '../components/Bottomlines';

export default function CartScreen() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Cart - ImmunoMap</title>
        </Head>
        <Cart/>

        <Bottomlines/>
        
      </section>
    </Layout>
  );
}
