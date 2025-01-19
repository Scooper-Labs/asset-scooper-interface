const SelectIcon = ({
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
      d="M5.5 5.318L2.816 8l-.707-.707L6 3.403l3.889 3.89L9.18 8 6 4.818l-.5.5z"
      fill="#fff"
    />
  </svg>
);

export default SelectIcon;
