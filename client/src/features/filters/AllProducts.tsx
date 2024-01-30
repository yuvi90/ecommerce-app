import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAllProductsQuery } from "../products/productAPI";
import ProductCard from "../products/ProductCard";
import Loader, { Skeleton } from "../../components/Loader";

const uniqueCategories: string[] = [
  "Phones",
  "Laptops",
  "Gaming Consoles",
  "Televisions",
  "Gadgets",
  "Audio",
  "Wearables",
  "Smart Home",
  "Cameras",
];

const AllProducts: React.FC = () => {
  const { data, isLoading, isError } = useAllProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"priceAsc" | "priceDesc">("priceAsc");

  if (isError) toast.error("Cannot Fetch the Products");

  if (isLoading) {
    return <Loader />;
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortByChange = (value: "priceAsc" | "priceDesc") => {
    setSortBy(value);
  };

  const currentProducts = data?.products
    .filter(
      (product) =>
        selectedCategory === "All" || product.category === selectedCategory.toLowerCase(),
    )
    .sort((a, b) => (sortBy === "priceAsc" ? a.price - b.price : b.price - a.price));

  return (
    <div className="bg-gray-100 py-10 min-h-[70vh]">
      <div className="w-full max-w-[1280px] px-4 mx-auto">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/4">
            {/* Filters Section */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div
                className={`cursor-pointer mb-2 ${
                  selectedCategory === "All" ? "text-slate-900 font-semibold" : ""
                }`}
                onClick={() => handleCategoryChange("All")}
              >
                All Products
              </div>
              {/* Category Filter */}
              {uniqueCategories.map((category, idx) => {
                return (
                  <div
                    key={idx}
                    className={`cursor-pointer mb-2 ${
                      selectedCategory === category ? "text-slate-900 font-semibold" : ""
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product List Section */}
          <div className="w-full md:w-3/4">
            <div className="flex items-center justify-between mb-4">
              {/* Sort By Filter */}
              <div className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-600">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortByChange(e.target.value as "priceAsc" | "priceDesc")}
                  className="p-2 border rounded-md"
                >
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Display Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                <Skeleton width="80vw" />
              ) : (
                currentProducts?.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
