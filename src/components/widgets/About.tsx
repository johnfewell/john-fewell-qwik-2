import { component$ } from '@builder.io/qwik';
import headShot from '~/assets/images/home-computer.webp';

export default component$(() => {
  return (
    <div class="bar h-full">
      <canvas id="animation"></canvas>
      <section class={`hero-gradient dark:bg-none mt-[-72px] h-full`}>
        <div class="max-w-6xl mx-auto md:flex  2xl:h-auto pt-[72px]">
          <div class="py-12 px-12 hero-grid">
            <div class="flex flex-col justify-start pb-8 z-10">
              <h1 class="tracking-widest leading-none mb-10">About</h1>
              <div class="">
                <div class="name-display mb-10">
                  I'M JOHN. A DEVELOPER, MAKER AND PROBLEM SOLVER.
                </div>
              </div>
              <div class="xl:text-sm text-base">
                <p>
                  My background in remote and in-person roles includes leading
                  development teams, implementing performance improvements, and
                  collaborating with designers, product managers, and back-end
                  engineers to create scalable web applications.
                </p>
                <br />
                <p>
                  With a solid understanding of back-end and DevOps technologies
                  such as Docker, REST APIs, MySQL, and AWS, I am well-equipped
                  to tackle many projects. My education in software engineering
                  from Flatiron School and a Bachelor of Arts from Sarah
                  Lawrence College.
                </p>
                <div class="small-heading mb-4 mt-4">SKILLS</div>
                <p>
                  Engineering Leadership / JavaScript / TypeScript / Angular /
                  Ionic / RxJS / SASS / Node.js / Express / REST APIs / MySQL /
                  Docker / AWS / Git /
                </p>
                <button
                  class="mt-2 fancy-button bg-blue-500 text-white px-4 py-2 text-md font-semibold tracking-wide"
                  onClick$={() =>
                    window.open(
                      '/files/John_Fewell-Resume.pdf',
                      '_blank',
                      'noreferrer'
                    )
                  }
                >
                  RESUME
                </button>
                <div class="small-heading mb-4 mt-4">EXPERIENCE</div>

                <ul>
                  <li>
                    10 years experience in Web Development, SEO, and Digital
                    Marketing
                  </li>
                  <li>Within those 10 years, I have:</li>
                  <ul>
                    <li>- 5 years experience in Software Development</li>
                    <li>- 1 year experience in DevOps</li>
                    <li>- 1 year experience in Backend Development</li>
                    <li>- 4 years experience in SEO</li>
                  </ul>
                </ul>

                <button
                  class="mt-2 fancy-button bg-blue-500 text-white px-4 py-2 text-md font-semibold tracking-wide"
                  onClick$={() =>
                    window.open('mailto:fewell@gmail.com', 'noreferrer')
                  }
                >
                  CONTACT
                </button>
              </div>
            </div>
            <div class="flex flex-col justify-start opacity-20 lg:opacity-100">
              <img
                src={headShot}
                class="inline-block mr-1 z-0"
                width={500}
                height={500}
                alt="John Fewell Logo"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
