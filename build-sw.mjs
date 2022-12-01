import { generateSW } from 'workbox-build';

generateSW({
  globDirectory: 'public/',
  globPatterns: [
    '**/*.{css,woff2,png,jpg}'
  ],
  swDest: 'public/sw.js'
}).then(({ count, size, warnings }) => {
  if (warnings.length > 0) {
    console.warn(
      'Warnings encountered while generating a service worker:',
      warnings.join('\n')
    );
  }

  console.log(`Generated a service worker, which will precache ${count} files, totaling ${size} bytes.`);
});