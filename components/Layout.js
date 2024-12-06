import Header from './Header/Header';
import Footer from './Footer/Footer';

export default function Layout({ children }) {
  return (
    <div>
      <Header user={true}/>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
