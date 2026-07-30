"use client";

import { Search } from "lucide-react";

export default function ProductSearch() {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="w-full h-12 pl-12 pr-4 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Search Button */}
        <button className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition">
          Search
        </button>
      </div>
    </div>
  );
}
