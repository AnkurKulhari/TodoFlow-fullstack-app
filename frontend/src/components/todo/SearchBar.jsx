import { Search } from "lucide-react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative mb-8">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

export default SearchBar;