import { useState } from 'react';

import IconMenu from '~/components/icons/IconMenu';

interface ItemProps {
  iconClass?: string;
}

export default (props: ItemProps) => {
  const { iconClass } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <button
      type="button"
      className={`ml-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center transition ${
        isExpanded ? 'expanded' : ''
      }`}
      aria-label="Toggle Menu"
      onClick={() => {
        setIsExpanded(!isExpanded);

        document.body.classList.toggle('overflow-hidden');
        document.getElementById('header')?.classList.toggle('h-screen');
        document.querySelector('#header nav')?.classList.toggle('hidden');
      }}
    >
      <IconMenu class={iconClass} />
    </button>
  );
};
