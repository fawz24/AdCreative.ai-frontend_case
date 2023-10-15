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

type SearchCategoryReturnData = {
  selectedCategories: string[];
  matchingCategories: CategoryEntry[];
};

export const searchCategories = async ({
  selectedCategoryIds,
  query,
  requestInit,
}: {
  query: string;
  selectedCategoryIds: string[];
  requestInit?: RequestInit;
}) => {
  try {
    const res = await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, selectedCategories: selectedCategoryIds }),
      ...requestInit,
    });
    const data = await res.json();
    return data.data as SearchCategoryReturnData;
  } catch {
    return {
      selectedCategories: selectedCategoryIds,
      matchingCategories: [],
    } as SearchCategoryReturnData;
  }
};
