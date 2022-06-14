// function which converts isostring date from database to a better string
export function isoStringToPvm(isoString: string) {
  const date = new Date(isoString)
  const monthnames = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const finalkuukausi = monthnames[date.getMonth()];
  const date2 = [finalkuukausi, date.getDate(), date.getFullYear()];
  return date2[1] + "." + date2[0] + "." + date2[2];
}

// function which truncates aka cuts off the text if it is longer than n characters
// used on feed for post description length
export function truncateDesc(str: string, n: number) {
  return str.length > n ? str.substring(0, n - 1) + "..." : str;
}