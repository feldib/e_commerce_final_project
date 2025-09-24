function Trophy({
  height,
  filled = false,
}: {
  height: string;
  filled?: boolean;
}) {
  const color = "#0c090d";
  return (
    <svg
      role="img"
      aria-label="set artwork to featured"
      xmlns="http://www.w3.org/2000/svg"
      width="auto"
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {/* Base */}
        <path
          d="M9 18.75H11.25V16.46C11.5 16.4867 11.75 16.5 12 16.5C12.25 16.5 12.5 16.4867 12.75 16.46V18.75H15V20.25H9V18.75Z"
          fill={color}
        />

        {/* Main body top line */}
        <path
          d="M6 4.5H18V6H16.5V11.3308C16.5 13.1552 14.7029 15 12 15C9.29713 15 7.5 13.1552 7.5 11.3308V6H6V4.5ZM7.5 6V11.3308C7.5 13.1552 9.29713 15 12 15C14.7029 15 16.5 13.1552 16.5 11.3308V6H7.5Z"
          fill={color}
        />

        {/* Main body U-shape */}
        <path
          d="M7.5 6V11.3308C7.5 13.1552 9.29713 15 12 15C14.7029 15 16.5 13.1552 16.5 11.3308V6"
          stroke={color}
          stroke-width="1.5"
          fill="none"
        />

        {/* Main body U-shape FILL */}
        {filled && (
          <path
            d="M7.5 6V11.3308C7.5 13.1552 9.29713 15 12 15C14.7029 15 16.5 13.1552 16.5 11.3308V6H7.5Z"
            fill={color}
          />
        )}

        {/* Left handle */}
        <path
          d="M6 4.5C4.34315 4.5 3 5.84315 3 7.5C3 9.15685 4.34315 10.5 6 10.5V9C5.17157 9 4.5 8.32843 4.5 7.5C4.5 6.67157 5.17157 6 6 6V4.5Z"
          fill={color}
        />

        {/* Right handle (mirrored) */}
        <path
          d="M18 4.5C19.6569 4.5 21 5.84315 21 7.5C21 9.15685 19.6569 10.5 18 10.5V9C18.8284 9 19.5 8.32843 19.5 7.5C19.5 6.67157 18.8284 6 18 6V4.5Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

export default Trophy;
