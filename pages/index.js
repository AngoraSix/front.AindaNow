import Head from 'next/head';
import Home from '../components/Home';
import config from '../config';

const HomePage = () => (
  <React.Fragment>
    <Head>
      <title>{config.site.head.title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/fonts/AdventPro.css" />
    </Head>

    <Home />
  </React.Fragment>
);

export default HomePage;
