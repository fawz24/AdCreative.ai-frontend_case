import { CategoryEntry } from "../type";

export const getAllCategories = async () => {
  try {
    const res = await fetch("/api/category");
    const data = await res.json();
    return data.data as CategoryEntry[];
  } catch {
    return [] as CategoryEntry[];
  }
};
