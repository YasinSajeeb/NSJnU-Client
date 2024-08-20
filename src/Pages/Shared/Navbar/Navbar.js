import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import useAdmin from "../../../hooks/useAdmin";
import useModerator from "../../../hooks/useModerator";

const Navbar = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutUsDropdownOpen, setIsAboutUsDropdownOpen] = useState(false);
  const [isMembersDropdownOpen, setIsMembersDropdownOpen] = useState(false);
  const [isOpportunitiesDropdownOpen, setIsOpportunitiesDropdownOpen] = useState(false);
  const [isPublicationsDropdownOpen, setIsPublicationsDropdownOpen] = useState(false);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const { user, logOut, loading } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isModerator] = useModerator(user?.email);
  const aboutUsDropdownRef = useRef();
  const membersDropdownRef = useRef();
  const opportunitiesDropdownRef = useRef();
  const publicationsDropdownRef = useRef();
  const galleryDropdownRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        aboutUsDropdownRef.current &&
        !aboutUsDropdownRef.current.contains(event.target)
      ) {
        setIsAboutUsDropdownOpen(false);
      }
      if (
        membersDropdownRef.current &&
        !membersDropdownRef.current.contains(event.target)
      ) {
        setIsMembersDropdownOpen(false);
      }
      if (
        opportunitiesDropdownRef.current &&
        !opportunitiesDropdownRef.current.contains(event.target)
      ) {
        setIsOpportunitiesDropdownOpen(false);
      }
      if (
        publicationsDropdownRef.current &&
        !publicationsDropdownRef.current.contains(event.target)
      ) {
        setIsPublicationsDropdownOpen(false);
      }
      if (
        galleryDropdownRef.current &&
        !galleryDropdownRef.current.contains(event.target)
      ) {
        setIsGalleryDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  const handleMenuClick = () => {
    // Delay closing the dropdown to ensure navigation completes first
    setTimeout(() => {
      setIsDropdownOpen(false);
      setIsAboutUsDropdownOpen(false);
      setIsMembersDropdownOpen(false);
      setIsOpportunitiesDropdownOpen(false);
      setIsPublicationsDropdownOpen(false);
      setIsGalleryDropdownOpen(false);
    }, 150); // Adjust the delay if needed
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleAboutUsDropdown = (event) => {
    event.stopPropagation();
    setIsAboutUsDropdownOpen((prevState) => !prevState);
  };

  const toggleMembersDropdown = (event) => {
    event.stopPropagation();
    setIsMembersDropdownOpen((prevState) => !prevState);
  };

  const toggleOpportunitiesDropdown = (event) => {
    event.stopPropagation();
    setIsOpportunitiesDropdownOpen((prevState) => !prevState);
  };

  const togglePublicationsDropdown = (event) => {
    event.stopPropagation();
    setIsPublicationsDropdownOpen((prevState) => !prevState);
  };

  const toggleGalleryDropdown = (event) => {
    event.stopPropagation();
    setIsGalleryDropdownOpen((prevState) => !prevState);
  };

  const menuItems = (
    <React.Fragment>
      <li>
        <NavLink
          exact
          to="/"
          activeClassName="active"
          onClick={handleMenuClick}
        >
          Home
        </NavLink>
      </li>
      <li className="relative" ref={aboutUsDropdownRef}>
        <Link to="#" onClick={toggleAboutUsDropdown}>
          About Us
        </Link>
        {isAboutUsDropdownOpen && (
          <ul className="dropdown-menu absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
            <li>
              <NavLink
                to="/organizationhistory"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                activeClassName="active"
                onClick={handleMenuClick}
              >
                Organization History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/aboutus/visionmission"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Mission & Vision
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/aboutus/executivemessages"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Executive Messages
              </NavLink>
            </li>
          </ul>
        )}
      </li>
      <li className="relative" ref={membersDropdownRef}>
        <Link to="#" onClick={toggleMembersDropdown}>
          Members
        </Link>
        {isMembersDropdownOpen && (
          <ul className="dropdown-menu absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
            <li>
              <NavLink
                to="/members/generalmembers"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                General Members
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/members/sponsors"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Sponsors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/members/executivecommittee"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Executive Committee
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/members/advisorypanels"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Advisory Panels
              </NavLink>
            </li>
          </ul>
        )}
      </li>
      <li className="relative" ref={opportunitiesDropdownRef}>
        <Link to="#" onClick={toggleOpportunitiesDropdown}>
          Opportunities
        </Link>
        {isOpportunitiesDropdownOpen && (
          <ul className="dropdown-menu absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
            <li>
              <NavLink
                to="/opportunities/jobs"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Jobs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/opportunities/internships"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Internships
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/opportunities/tuitions"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Tuitions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/opportunities/rooms"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Bachelors' Room
              </NavLink>
            </li>
          </ul>
        )}
      </li>
      <li className="relative" ref={publicationsDropdownRef}>
        <Link to="#" onClick={togglePublicationsDropdown}>
          Publications
        </Link>
        {isPublicationsDropdownOpen && (
          <ul className="dropdown-menu absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
            <li>
              <NavLink
                to="/publications/magazines"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Magazines
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/publications/constitutions"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Constitutions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/publications/annualreports"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Career Guidelines
              </NavLink>
            </li>
          </ul>
        )}
      </li>
      <li className="relative" ref={galleryDropdownRef}>
        <Link to="#" onClick={toggleGalleryDropdown}>
          Gallery
        </Link>
        {isGalleryDropdownOpen && (
          <ul className="dropdown-menu absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
            <li>
              <NavLink
                to="/gallery/photos"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Major Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gallery/videos"
                className="dropdown-item block px-4 py-2 hover:bg-gray-100"
                onClick={handleMenuClick}
              >
                Memories
              </NavLink>
            </li>
          </ul>
        )}
      </li>
      {user?.uid && (isAdmin || isModerator) ? (
              <li>
                <NavLink to="/dashboard" activeClassName="active">
                  Dashboard
                </NavLink>
              </li>
            ) : null}
      <li>
        <NavLink
          exact
          to="/notices"
          activeClassName="active"
          onClick={handleMenuClick}
        >
          Notice
        </NavLink>
      </li>
    </React.Fragment>
  );

  return (
    <div className="navbar font-normal bg-[#D0D0D0]">
      <div className="navbar-start justify-center">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
          >
            {menuItems}
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end justify-center">
        {loading ? (
          <div className="skeleton w-12 rounded-full shrink-0"></div>
        ) : user?.uid ? (
          <div className="dropdown dropdown-end" ref={dropdownRef}>
            <label
              tabIndex={1}
              className="btn btn-ghost btn-circle avatar"
              onClick={toggleDropdown}
            >
              <div className="w-12 p-0.5 border-2 border-lime-800 rounded-full">
                <img className="rounded-full" src={user?.photoURL} alt="" />
              </div>
            </label>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 absolute left-1/2 top-full transform -translate-x-1/2 up-arrow"
              >
                <p className="font-semibold text-lg my-4 mx-auto">
                  {user?.displayName}
                </p>

                <li className="text-lg">
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li className="text-lg">
                  <button className="" onClick={handleLogOut}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <ul className="menu menu-horizontal px-1 items-center">
            <li className="text-lg">
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
            <li className="text-lg">
              <NavLink to="/signup" activeClassName="active">
                Signup
              </NavLink>
            </li>
            <li>
              <FaUserCircle className="text-3xl p-0 ml-2" />
            </li>
          </ul>
        )}
        {user?.uid &&
        (isAdmin || isModerator) &&
        location.pathname === "/dashboard" ? (
          <label
            tabIndex={2}
            htmlFor="dashboard-drawer"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
