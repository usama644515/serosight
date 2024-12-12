import Layout from '@/components/Layout';
import Head from 'next/head';
import AccountSettings from '../components/Profile/AccountSettings';
import ListTile from '../components/Profile/ProfileTile';
import Bottomlines from '../components/Bottomlines';

export default function Profile() {
  return (
    <Layout>
      <section>
        <Head>
          <title>Profile - ImmunoMap</title>
        </Head>
        <AccountSettings />
        <ListTile />
        <Bottomlines/>
      </section>
    </Layout>
  );
}
