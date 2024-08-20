import React, { useRef, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const DropdownMenu = ({ title, menuItems, handleMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <li className="relative" ref={dropdownRef}>
      <Link to="#" onClick={toggleDropdown}>
        {title}
      </Link>
      {isDropdownOpen && (
        <ul className="dropdown-menu absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
          {menuItems.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setIsDropdownOpen(false); // Close the dropdown when an item is clicked
                  handleMenuClick(); // Trigger any additional logic from the Navbar component
                }}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default DropdownMenu;
