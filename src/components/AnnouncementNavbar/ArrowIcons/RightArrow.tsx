import { SvgProps } from "@/lib/components/types";

function ArrowRightIcon(props: SvgProps) {
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
        d="M7.96 5.793L6.213 7.54a1.324 1.324 0 000 1.867l4.347 4.347M10.56 3.193l-.694.694"
        stroke="#fff"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowRightIcon;
