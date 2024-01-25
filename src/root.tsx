import { component$, useStyles$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';

import { RouterHead } from '~/components/common/RouterHead';
import { DarkThemeLauncher } from '~/components/common/DarkThemeLauncher';

// import "@fontsource-variable/inter";
import globalStyles from '~/assets/styles/global.css?inline';
import prism from '~/assets/styles/prism.css?inline';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  useStyles$(globalStyles + prism);

  return (
    <QwikCityProvider>
      <head>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "8b78ef5c9b154436b6b8795a026af97c"}'
        ></script>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <DarkThemeLauncher />
        <ServiceWorkerRegister />
      </head>
      <body class="text-gray-900 dark:text-slate-300 tracking-tight bg-white dark:bg-gray-900 antialiased">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
