import React from "react";
import { stripPrice } from "@/utils/numberUtils";

interface FNProps {
  pre?: string;
  amount: number;
  suf?: string;
}

const FormatNumber: React.FC<FNProps> = ({ pre, amount, suf }) => {
  const { subscript, value } = stripPrice(amount);

  const formattedValue = (() => {
    switch (subscript) {
      case null:
        return value;
      case "0":
        return `0.0${value}`;
      case "-1":
        return `0.${value}`;
      default:
        return (
          <>
            0.0<sub>{subscript}</sub>
            {value}
          </>
        );
    }
  })();

  return (
    <span>
      {pre ? pre : ""}
      {formattedValue}&nbsp;
      {suf ? suf : ""}
    </span>
  );
};

export default FormatNumber;
