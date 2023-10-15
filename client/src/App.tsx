import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllCategories } from "./services/category";
import { SearchIcon } from "./components/SearchIcon";

function App() {
  const [categories, setCategories] = useState<string[]>([]);

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
          />
          <SearchIcon className="pointer-events-none" />
        </label>
        <div className="max-h-80 overflow-y-auto">
          <ul>
            {categories.map((category) => (
              <li key={category} value={category}>
                <label>
                  <input type="checkbox" name="category" value={category} />
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <button className="bg-blue text-white w-full p-2 rounded-md">
          Ara
        </button>
      </div>
    </main>
  );
}

export default App;
