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

type ExtractSearchProps = SearchParams | IterableIterator<[string, string]>;

export function extractSearchParams(searchParams: ExtractSearchProps) {
  let params: { [key: string]: any } = {};

  if (searchParams) {
    if (typeof searchParams === "object" && Symbol.iterator in searchParams) {
      for (const [key, value] of searchParams) {
        params[key] = value;
      }
    } else {
      params = { ...searchParams };
    }
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
