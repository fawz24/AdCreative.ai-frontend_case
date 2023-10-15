import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { getAllCategories, searchCategories } from "./services/category";
import { SearchIcon } from "./components/SearchIcon";
import { CategoryEntry } from "./type";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { CategoryListItem } from "./components/CategoryListItem";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<CategoryEntry[]>([]);
  const [selectedCategories, setSelectedCategories] = useLocalStorage<
    CategoryEntry[]
  >("selectedCategories", []);
  const controllerRef = useRef<AbortController>();

  const selectedCategoryIds = selectedCategories.map(({ id }) => id);
  const unselectedCategories = categories.filter(
    ({ id }) => !selectedCategoryIds.includes(id)
  );

  const selectCategory = (category: CategoryEntry) => {
    setSelectedCategories((_selectedCategories) => {
      const newSelectedCategories = [category].concat(_selectedCategories);
      return newSelectedCategories;
    });
  };

  const deselectCategory = (category: CategoryEntry) => {
    setSelectedCategories((_selectedCategories) => {
      const newSelectedCategories = _selectedCategories.filter(
        ({ id }) => id !== category.id
      );
      return newSelectedCategories;
    });
  };

  const search: React.FormEventHandler<HTMLFormElement> = async (e) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    e.preventDefault();
    const result = await searchCategories({
      selectedCategoryIds,
      query: searchQuery,
      requestInit: {
        signal,
      },
    });
    setCategories(result.matchingCategories);
  };

  const fetchAllCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <main className="p-10">
      <form
        className="border border-gray-2 rounded-md bg-gray-1 p-6 w-max flex flex-col items-start mx-auto gap-3"
        onSubmit={search}
      >
        <h2>Kategoriler</h2>
        <label className="w-full flex justify-between items-center p-2 rounded-md text-gray-3 bg-white border border-gray-2 focus-within:outline-2 focus-within:outline-gray-2 focus-within:outline">
          <input
            type="text"
            placeholder="kategori ara..."
            className="w-full border-none outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <SearchIcon className="pointer-events-none" />
        </label>
        <div className="max-h-80 overflow-y-auto">
          <ul
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                event.preventDefault();
                return false;
              }
            }}
          >
            {selectedCategories.map((category) => (
              <CategoryListItem
                key={category.id}
                category={category}
                selectCategory={selectCategory}
                deselectCategory={deselectCategory}
                isSelected={true}
              />
            ))}
            {unselectedCategories.map((category) => (
              <CategoryListItem
                key={category.id}
                category={category}
                selectCategory={selectCategory}
                deselectCategory={deselectCategory}
              />
            ))}
          </ul>
        </div>
        <button className="bg-blue-1 text-white w-full p-2 rounded-md">
          Ara
        </button>
      </form>
    </main>
  );
}

export default App;
