export const getAllCategories = async () => {
  try {
    const res = await fetch("/api/category");
    const data = await res.json();
    return data.data as string[];
  } catch {
    return [] as string[];
  }
};
