import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="bar h-full">
      <section class={`hero-gradient dark:bg-none h-full mt-[-72px]`}>
        <div class="max-w-6xl mx-auto md:flex pt-[72px]">
          <div class="py-12 px-12 hero-grid">
            <div class="flex flex-col justify-end pb-8">
              <div class="">
                <div class="name-display mb-2">JOHN FEWELL</div>
              </div>
              <div class="xl:text-sm text-base">
                Web developer specializing in Angular and learning Qwik. <br />
                <br />
                Currently working as a Software Developer at{' '}
                <a
                  class="underline decoration-solid"
                  href="https://www.3pillarglobal.com/"
                  target="_blank"
                >
                  3Pillar Global
                </a>
                .
              </div>
            </div>
            <div class="flex flex-col justify-end">
              <div>
                <h1
                  class="tracking-wider cursor-pointer leading-none moveup-text"
                  onClick$={() =>
                    window.open(
                      'https://github.com/johnfewell',
                      '_blank',
                      'noreferrer'
                    )
                  }
                >
                  WORK
                </h1>
                <h1 class="tracking-wider cursor-pointer leading-none moveup-text">
                  <a href="/about/">ABOUT</a>
                </h1>
                <h1
                  class="tracking-wider cursor-pointer leading-none moveup-text"
                  onClick$={() =>
                    window.open('mailto:fewell@gmail.com', 'noreferrer')
                  }
                >
                  CONTACT
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
