import { SearchParams, SortValue } from "./types";

export function capitalizeString(str: string, removeHyphen = true) {
  if (!str) return "General";
  let res = str[0].toUpperCase() + str.slice(1).toLowerCase();
  if (removeHyphen) return res.replace("-", " ");
  const hyphenIdx = str.indexOf("-");
  if (hyphenIdx !== -1) {
    res =
      res.slice(0, hyphenIdx + 1) +
      res[hyphenIdx + 1].toUpperCase() +
      res.slice(hyphenIdx + 2);
  }
  return res;
}

export function extractSearchParams(
  searchParams: SearchParams | [string, string],
) {
  let params: { [key: string]: any } = {};

  if (Array.isArray(searchParams)) {
    const [key, value] = searchParams;
    params[key] = value;
  } else if (searchParams && typeof searchParams === "object") {
    params = { ...searchParams };
  } else {
    params = {};
  }

  const result = {
    page: "",
    brand: "",
    category: "",
    sort: "" as SortValue,
    grid: "",
    selectedRating: "",
    min: "",
    max: "",
    cid: "",
  };

  for (const key in params) {
    if (key === "cat") {
      result["category"] = params[key];
      continue;
    } else if (key === "sr") {
      result["selectedRating"] = params[key];
      continue;
    }
    result[key as keyof typeof result] = params[key];
  }

  return result;
}
