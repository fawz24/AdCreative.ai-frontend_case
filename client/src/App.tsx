import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { getAllCategories, searchCategories } from "./services/category";
import { SearchIcon } from "./components/SearchIcon";
import { CategoryEntry } from "./type";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { CategoryListItem } from "./components/CategoryListItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FetchStatus = "initial" | "idle" | "fetching" | "error";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("initial");
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
    e.preventDefault();
    // abort ongoing search
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    setFetchStatus("fetching");
    const { data, error } = await searchCategories({
      selectedCategoryIds,
      query: searchQuery,
      requestInit: {
        signal,
      },
    });
    if (error) {
      setFetchStatus("error");
      setErrorMessage(error);
      return;
    }
    setCategories(data.matchingCategories);
    setFetchStatus("idle");
  };

  const fetchAllCategories = async () => {
    setFetchStatus("fetching");
    const { data, error } = await getAllCategories();
    if (error) {
      setFetchStatus("error");
      setErrorMessage(error);
      return;
    }
    setCategories(data);
    setFetchStatus("idle");
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (fetchStatus === "error" && !/user aborted/gi.test(errorMessage)) {
      toast.dismiss();
      toast.error("Kategori bilgileri çekerken beklenmeyen bir hata oluştu", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [fetchStatus, errorMessage]);

  const noMoreItems =
    (fetchStatus === "idle" || fetchStatus === "error") &&
    unselectedCategories.length <= 0;

  return (
    <main className="p-10 h-[100vh] relative">
      <form
        className="border py-6 border-gray-2 rounded-md bg-gray-1 w-[30rem] flex flex-col items-start mx-auto my-auto gap-3 text-xl"
        onSubmit={search}
      >
        <h2 className="px-6">Kategoriler</h2>
        <div className="px-6 w-full">
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
        </div>
        <div className="w-full pr-6">
          <ul
            className="max-h-80 overflow-auto flex flex-col gap-1 pl-6 w-full"
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
        {noMoreItems && <div className="px-6">Daha fazla sonuç yok</div>}
        <div className="px-6 w-full">
          <button className="bg-[#264cc5] text-white w-full p-2 rounded-md">
            Ara
          </button>
        </div>
      </form>
      <ToastContainer />
    </main>
  );
}

export default App;
