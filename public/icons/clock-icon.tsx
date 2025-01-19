const ClockIcon = ({
  height = 12,
  width = 12,
}: {
  height?: number;
  width?: number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.999 11a5 5 0 110-10 5 5 0 010 10zm0-1a4 4 0 100-8 4 4 0 000 8zm.5-4h2v1h-3V3.5h1V6z"
      fill="#9E829F"
    />
  </svg>
);

export default ClockIcon;
