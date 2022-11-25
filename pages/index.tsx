import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { Workbox } from 'workbox-window';

const perf = () => {
  const t1 = performance.now();

  console.log(t1);
}

const wbregister = () => {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox(`${process.env.basePath}/sw.js`);
    wb.register();
  }
}

export default function Home() {
  perf();

  const didRunOnce = useRef(false);
  useEffect(() => {
    console.log('didRunOnce');
    if (!didRunOnce.current) {
      didRunOnce.current = true;
      wbregister();
    }
  }, []);

  return (
    <div>
      <Head>
        <title>pwa-workbox-nextjs</title>
        <meta name="description" content="Progressive Web App - workbox - Next.JS" />
        <link rel="icon" href={`${process.env.basePath}/favicon.ico`} />
      </Head>

      <h1 className="text-3xl font-bold">
        test
      </h1>

    </div>
  )
}
