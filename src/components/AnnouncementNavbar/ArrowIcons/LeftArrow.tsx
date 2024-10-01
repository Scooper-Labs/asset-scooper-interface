import { SvgProps } from "@/lib/components/types";

function ArrowLeftIcon(props: SvgProps) {
  return (
    <svg
      width={17}
      height={17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.04 5.793l1.747 1.747a1.324 1.324 0 010 1.867L6.44 13.754M6.44 3.193l.694.694"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowLeftIcon;
