import Head from 'next/head';
import Image from 'next/image';
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
    if (!didRunOnce.current) {
      console.log('didRunOnce');
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
      <img src={`${process.env.basePath}/vercel.svg`} alt='vercel logo' width={80} height={30}/>
    </div>
  )
}
