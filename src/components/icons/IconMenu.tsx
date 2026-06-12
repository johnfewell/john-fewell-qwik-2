interface ItemProps {
  class?: string;
}

export default (props: ItemProps) => {
  const { class: className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler ${className || 'w-5 h-5'}`}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        className="icon-tabler"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 8h16"></path>
        <path d="M4 16h16"></path>
      </g>
    </svg>
  );
};
