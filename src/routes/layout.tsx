import { component$, Slot } from '@builder.io/qwik';

import Header from '~/components/widgets/Header';

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
    </>
  );
});
