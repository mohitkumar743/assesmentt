import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home" },
    {
      name: "Pages",
      dropdown: ["About", "Contact", "FAQ"],
    },
    {
      name: "Shop",
      dropdown: ["All Products", "Categories", "Best Sellers"],
    },
    {
      name: "Blog",
      dropdown: ["Latest Posts", "Tech", "Lifestyle"],
    },
  ];

  return (
    <nav className="bg-white shadow-sm w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* thsi is logo side */}
          <div className="flex-shrink-0 text-xl font-bold">Flatlogic</div>
          {/* this is center of navbar */}
          <div className="hidden md:flex flex-1 justify-center space-x-6">
            {navItems.map((item, index) =>
              item.dropdown ? (
                <div key={index} className="relative group">
                  <button className="text-gray-700 hover:text-black flex items-center">
                    {item.name}
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded w-40">
                    {item.dropdown.map((sub, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-black"
                >
                  {item.name}
                </a>
              )
            )}
          </div>

          {/* this is for icons on left side */}
          <div className="hidden md:flex space-x-4 items-center">
            <FaSearch className="cursor-pointer" />
            <FaUser className="cursor-pointer" />
            <FaShoppingCart className="cursor-pointer" />
          </div>

          {/* in mobile thsi is for open options */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* this is shown in mobile */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow-sm">
          {navItems.map((item, index) =>
            item.dropdown ? (
              <div key={index}>
                <p className="font-semibold">{item.name}</p>
                
              </div>
            ) : (
              <a
                key={index}
                href={item.href}
                className="block text-gray-700 hover:text-black"
              >
                {item.name}
              </a>
            )
          )}
          <div className="flex space-x-4 pt-2">
            <FaSearch />
            <FaUser />
            <FaShoppingCart />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
