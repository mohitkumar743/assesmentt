import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";


function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("Most Popular");


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => {
        const data = res.data;
        setAllProducts(data);
        setProducts(data);
        setCategories([...new Set(data.map((p) => p.category))]);
        setBrands([...new Set(data.map((p) => p.brand))]);
      })
      .catch((err) => console.error("Initial fetch failed:", err));
  }, []);

  // here we done filteration
  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrand) {
      filtered = filtered.filter((p) => p.brand === selectedBrand);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // sort products based on user input
  if (sortOption === "Price: Low to High") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortOption === "Price: High to Low") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

    setProducts(filtered);
  }, [allProducts, selectedCategory, selectedBrand, priceRange ,sortOption]);

  const renderFilters = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold mb-2">CATEGORIES</h3>
        {categories.map((cat) => (
          <label key={cat} className="block mb-1">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === cat}
              onChange={() => setSelectedCategory(cat)}
              
              className="appearance-none  w-4 h-4 border border-gray-400 checked:bg-blue-500  checked:border-transparent rounded-none mr-2"
            />
            {cat}
          </label>
        ))}
        <button
          className="text-sm text-blue-600 mt-1"
          onClick={() => setSelectedCategory("")}
        >
          Clear
        </button>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">PRICE</h3>
        <p className="text-sm mb-1">
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </p>
        <input
          type="range"
          min="0"
          max="1500"
          step="50"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          className="w-full"
        />
       
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">BRANDS</h3>
        {brands.map((brand) => (
          <label key={brand} className="block mb-1">
            <input
              type="radio"
              name="brand"
              checked={selectedBrand === brand}
              onChange={() => setSelectedBrand(brand)}
              className="appearance-none  w-4 h-4 border border-gray-400 checked:bg-blue-500  checked:border-transparent rounded-none mr-2"
            />
            {brand}
          </label>
        ))}
        <button
          className="text-sm text-blue-600 mt-1"
          onClick={() => setSelectedBrand("")}
        >
          Clear
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-800 px-4 pt-4 mx-5 sm:mx-20 md:mx-16 lg:mx-32 sm:px-6">
        {/* this btn shows in mobile  for open filter option */}
        <div className="md:hidden flex justify-start mb-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setShowFilters(true)}
          >
            Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="hidden md:block w-64">{renderFilters()}</aside>

          <main className="flex-1">
            <div className="flex justify-between mb-6">
              <p className="text-sm">Showing {products.length} Products</p>
              <div>
                <label className="text-sm mr-2">Sort by:</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded p-1 text-sm"
                >
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-[#f4f4f4] pb-4 rounded shadow-sm  transition group"
                >
                  <div className="w-full h-64 mb-6 bg-[#f4f4f4] flex items-center justify-center overflow-hidden rounded">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm pl-3 text-gray-500">
                    {product.category}
                  </p>
                  <h3 className="font-semibold pl-3 text-md group-hover:text-orange-600">
                    {product.name}
                  </h3>
                  <p className="text-sm pl-3 text-gray-600">{product.brand}</p>
                  <p className="text-lg pl-3 font-bold text-gray-800 ">
                    ₹{product.price}
                  </p>
                </div>
              ))}
            </div>
          </main>
        </div>

        {showFilters && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white rounded-lg w-11/12 max-w-md p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                onClick={() => setShowFilters(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              {renderFilters()}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
