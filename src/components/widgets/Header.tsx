import { useEffect, useState } from 'react';

import Logo from '~/components/common/Logo';
import ToggleTheme from '~/components/common/ToggleTheme';
import ToggleMenu from '~/components/common/ToggleMenu';

const menuItems = [{ text: 'Blog', href: '/blog/' }];

export default () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolling(window.scrollY >= 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 flex-none mx-auto w-full transition-all${
        isScrolling
          ? ' md:bg-white/90 md:backdrop-blur-sm dark:md:bg-slate-900/90 bg-white dark:bg-slate-900'
          : ''
      }`}
      id="header"
    >
      <div className="px-3 mx-auto w-full md:flex md:justify-between max-w-6xl md:px-4">
        <div className="flex justify-between">
          <a className="flex items-center" href={'/'}>
            <Logo />
          </a>
          <div className="flex items-center md:hidden">
            <ToggleTheme iconClass="w-6 h-6" />
            <ToggleMenu iconClass="w-6 h-6" />
          </div>
        </div>

        <div className="md:self-center flex items-center mb-4 md:mb-0 ml-4">
          <nav
            className="items-center w-full md:w-auto hidden md:flex text-gray-500 dark:text-slate-200 h-[calc(100vh-100px)] md:h-auto overflow-y-auto md:overflow-visible pr-4"
            aria-label="Main navigation"
          >
            <ul className="flex flex-col pt-8 md:pt-0 md:flex-row md:self-center w-full md:w-auto text-xl md:text-lg">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="font-medium hover:text-gray-900 dark:hover:text-white px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center md:flex">
            <ToggleTheme iconClass="w-6 h-6" />
          </div>
        </div>
      </div>
    </header>
  );
};
