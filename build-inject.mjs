import { injectManifest } from 'workbox-build';

injectManifest({
  globDirectory: 'public/',
  globPatterns: [
    '**/*.{css,woff2,png,svg,jpg}'
  ],
  swDest: 'public/sw.js',
  swSrc: 'sw-src.js'
}).then(({count, size, warnings}) => {
  if (warnings.length > 0) {
    console.warn(
      'Warnings encountered while injecting the manifest:',
      warnings.join('\n')
    );
  }

  console.log(`Injected a manifest which will precache ${count} files, totaling ${size} bytes.`);
});