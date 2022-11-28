import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Workbox } from 'workbox-window';

const perf = () => {
  const t1 = performance.now();

  console.log(t1);
}

const wbregister = () => {
  console.log('inside wbregister');
  console.log(navigator);
  if ('serviceWorker' in navigator) {
    console.log('found serviceWorker');
    // window.addEventListener('load', function () {
    //   navigator.serviceWorker.register(`${process.env.basePath}/sw.js`);
    // });
    const wb = new Workbox(`${process.env.basePath}/sw.js`);
    wb.register();
  }
}

const test1 = () => {
  console.log('test1');
  const result1 = document.getElementById('result1');
  const img1 = document.createElement('img');
  img1.src = `${process.env.basePath}/pic01.png`;
  img1.width = 50;
  img1.height = 50;
  result1?.appendChild(img1);
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

      <div className='flex flex-col justify-center gap-4'>
        <img src={`${process.env.basePath}/vercel.svg`} alt='vercel logo' width={80} height={30} />

        <div className='flex flex-col justify-center items-center'>
          <p className='h1'>Test 1</p>
          <div className='cursor-pointer p-4 bg-lime-500' onClick={test1}>
            call test1
          </div>
          <div id='result1' className='w-[50%] bg-gray-400 flex flex-col justify-center'>
            result
          </div>
        </div>

        <div className='cursor-pointer p-4 bg-lime-500'>
          Test 1
        </div>
      </div>
    </div>
  )
}
