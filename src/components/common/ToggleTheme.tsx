import { useEffect, useState } from 'react';

import IconSun from '~/components/icons/IconSun';
import IconMoon from '~/components/icons/IconMoon';

interface ItemProps {
  iconClass?: string;
}

export default (props: ItemProps) => {
  const { iconClass } = props;
  const [theme, setTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  }, []);

  return (
    <button
      type="button"
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
      aria-label="Toggle between Dark and Light mode"
      onClick={() => {
        switch (theme) {
          case 'dark':
            document.documentElement.classList.remove('dark');
            setTheme((window.localStorage.theme = 'light'));
            break;
          default:
            document.documentElement.classList.add('dark');
            setTheme((window.localStorage.theme = 'dark'));
            break;
        }
      }}
    >
      {theme == 'dark' ? (
        <IconMoon class={iconClass} />
      ) : (
        <IconSun class={iconClass} />
      )}
    </button>
  );
};
