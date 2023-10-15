import { CategoryEntry } from "../type";

type FetchResult<D> = {
  data: D;
  error?: string;
};

export const getAllCategories = async (): Promise<
  FetchResult<CategoryEntry[]>
> => {
  try {
    const res = await fetch("/api/category");
    const data = await res.json();
    return { data: data.data, error: undefined };
  } catch (e) {
    return { data: [], error: (e as Error).message };
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
}): Promise<FetchResult<SearchCategoryReturnData>> => {
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
    return { data: data.data, error: undefined };
  } catch (e) {
    return {
      data: {
        selectedCategories: selectedCategoryIds,
        matchingCategories: [],
      },
      error: (e as Error).message,
    };
  }
};
