import React from "react";

const SearchBar = ({ searchTerm, onSearchChange, onAddDeveloper }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
      <div className="flex-1 w-full sm:max-w-md">
        <input
          type="text"
          placeholder="🔍 Search by skills or location..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        onClick={onAddDeveloper}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
      >
        ➕ Add Developer
      </button>
    </div>
  );
};

export default SearchBar;
