export function stripPrice(_price: number) {
  let price = _price.toString();
  if (Math.floor(Number(price)) > 0) {
    return { subscript: null, value: formatVolume(price) };
  }
  if (Number(price) === 0) {
    return { subscript: null, value: "0" };
  }
  // Split on decimal
  const [, decimal] = price.split(".");

  // Remove trailing zeros
  const value = decimal.replace(/^0+/, "");

  // Get substring of just zeros
  const zeros = decimal.slice(0, -value.length);

  // Add subscript with zeros count - 1
  const subscript = zeros.length - 1;

  return { subscript: subscript.toString(), value: value.slice(0, 2) };
}

export function formatVolume(volume: string) {
  const num = parseFloat(volume);

  if (isNaN(num)) {
    return "0";
  }

  if (num >= 1e9) {
    // Value is in billions
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    // Value is in millions
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    // Value is in thousands
    return (num / 1e3).toFixed() + "K";
  } else {
    // Value is less than 1,000
    return num.toFixed(2);
  }
}
function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th"; // 11th to 20th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
export function getTime(timestamp: number) {
  const date = new Date(timestamp * 1000);

  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  const formattedDate = `${day}${getOrdinalSuffix(
    day
  )} ${month}, ${year} (${hours}:${minutes})`;

  return formattedDate;
}
