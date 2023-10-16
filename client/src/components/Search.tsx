import { SearchIcon } from "./SearchIcon";

export type SearchProps = {
  query: string;
  setQuery: (query: string) => void;
};

export const Search = ({ query, setQuery }: SearchProps) => {
  return (
    <label className="group text-lg focus-within:text-xl ease-in duration-100 w-full flex justify-between items-center p-2 rounded-md text-gray-3 bg-white border border-gray-2 focus-within:outline-2 focus-within:outline">
      <input
        type="text"
        placeholder="kategori ara..."
        className="w-full border-none outline-none"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <SearchIcon className="pointer-events-none" />
    </label>
  );
};
