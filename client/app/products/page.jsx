"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import products from "@/data/products";
import ProductGrid from "@/components/products/ProductGrid";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // সব Category বের করা
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Search + Filter + Sort
  const filteredProducts = useMemo(() => {
    let data = [...products];

    // Search
    if (search.trim()) {
      data = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category
    if (category !== "All") {
      data = data.filter((product) => product.category === category);
    }

    // Sort
    switch (sortBy) {
      case "low":
        data.sort((a, b) => a.price - b.price);
        break;

      case "high":
        data.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        data.sort((a, b) => b.rating - a.rating);
        break;

      case "name":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;

      default:
        break;
    }

    return data;
  }, [search, category, sortBy]);

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">All Products</h1>
        <p className="text-gray-500 mt-2">
          Showing {filteredProducts.length} products
        </p>
      </div>

      {/* Search + Filter + Sort */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 "
        >
          {categories.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 "
        >
          <option className="text-black" value="default">
            Default
          </option>
          <option className="text-black" value="low">
            Price : Low → High
          </option>
          <option className="text-black" value="high">
            Price : High → Low
          </option>
          <option className="text-black" value="rating">
            Top Rated
          </option>
          <option className="text-black" value="name">
            Name (A-Z)
          </option>
        </select>
      </div>

      {/* Products */}
      <ProductGrid products={filteredProducts} />
    </section>
  );
}
