import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllCategories, searchCategories } from "./services/category";
import { SearchIcon } from "./components/SearchIcon";
import { CategoryEntry } from "./type";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<CategoryEntry[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryEntry[]>(
    []
  );

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

  const unselectCategory = (category: CategoryEntry) => {
    setSelectedCategories((_selectedCategories) => {
      const newSelectedCategories = _selectedCategories.filter(
        ({ id }) => id !== category.id
      );
      return newSelectedCategories;
    });
  };

  const search = async () => {
    const result = await searchCategories({
      selectedCategoryIds,
      query: searchQuery,
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
      <div className="border border-gray-2 rounded-md bg-gray-1 p-6 w-max flex flex-col items-start mx-auto gap-3">
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
          <ul>
            {selectedCategories
              .concat(unselectedCategories)
              .map((categoryEntry) => {
                const { id, category } = categoryEntry;
                return (
                  <li key={id} value={category}>
                    <label>
                      <input
                        type="checkbox"
                        name="category"
                        value={id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            selectCategory(categoryEntry);
                          } else {
                            unselectCategory(categoryEntry);
                          }
                        }}
                      />
                      {category}
                    </label>
                  </li>
                );
              })}
          </ul>
        </div>
        <button
          className="bg-blue text-white w-full p-2 rounded-md"
          onClick={search}
        >
          Ara
        </button>
      </div>
    </main>
  );
}

export default App;
