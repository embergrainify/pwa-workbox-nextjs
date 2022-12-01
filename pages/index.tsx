import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Workbox } from 'workbox-window';

const wbregister = () => {
  // console.log('inside wbregister');
  // console.log(navigator);
  if ('serviceWorker' in navigator) {
    console.log('serviceWorker in navigator');
    // window.addEventListener('load', function () {
    //   navigator.serviceWorker.register(`${process.env.basePath}/sw.js`);
    // });
    const wb = new Workbox(`${process.env.basePath}/sw.js`);
    wb.register();
  }
}

const test1 = () => {
  console.log('test1');
  const container = document.getElementById('container');
  const img = document.createElement('img');
  img.src = `${process.env.basePath}/vercel.svg`;
  container?.appendChild(img);
}

const test2 = () => {
  console.log('test2');
  const container = document.getElementById('container');
  const img = document.createElement('img');
  img.src = `${process.env.basePath}/pic01.png`;
  container?.appendChild(img);
}

export default function Home() {

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
      <div id="container" className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-bold">
          Progressive Web App - Vanilla - Next.JS
        </h1>
        <button className="rounded-lg px-8 py-2 bg-red-600 text-gray-100" onClick={test1}>Test1</button>
        <button className="rounded-lg px-8 py-2 bg-green-600 text-gray-100" onClick={test2}>Test2</button>
        <Image src={`${process.env.basePath}/vercel.svg`} alt='vercel' width='283' height='64' />
        <Image src={`${process.env.basePath}/pic01.png`} alt='pic01' width='200' height='200' />
      </div>
    </div>
  )
}
