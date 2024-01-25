import { component$ } from '@builder.io/qwik';

// @ts-ignore
import logoSrc from '~/assets/images/blob-logo.svg';

export default component$(() => (
  <span class="self-center ml-2 text-2xl md:text-xl font-bold text-gray-900 whitespace-nowrap dark:text-white flex items-center">
    <img
      src={logoSrc}
      class="inline-block mr-1"
      width={32}
      height={32}
      alt="John Fewell Logo"
      loading="lazy"
    />
    <span class="name-display">JF</span>
  </span>
));
