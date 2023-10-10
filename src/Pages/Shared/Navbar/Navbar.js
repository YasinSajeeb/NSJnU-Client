import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from '../../../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { FaUserCircle } from "react-icons/fa";
import './Navbar.css';

const Navbar = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {user, logOut} = useContext(AuthContext);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTimeout(() => {
          setIsDropdownOpen(false);
        }, 100); // Add a small delay before closing the dropdown
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(err => console.log(err));
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const menuItems = (
    <React.Fragment>
      <li>
        <NavLink exact to='/' activeClassName='active'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/members' activeClassName='active'>
          Members
        </NavLink>
      </li>
      <li>
        <NavLink to='/executivecommittee' activeClassName='active'>
          Executive Committee
        </NavLink>
      </li>
      <li>
        <NavLink to='/articles' activeClassName='active'>
          Articles
        </NavLink>
      </li>
      <li>
        <NavLink to='/about' activeClassName='active'>
          About Us
        </NavLink>
      </li>
    </React.Fragment>
  );

  return (
    <div className="navbar font-normal" style={{ background: 'linear-gradient(135deg, #FFC764, #E3B655)' }}>
      <div className="navbar-start justify-center">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {menuItems}
          </ul>
        </div>
        <Link to='/'>
          <img src={logo} alt="" className='w-20' />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems}
        </ul>
      </div>
      <div className="navbar-end justify-center">
      {user?.uid ? (
<div className="dropdown dropdown-end" ref={dropdownRef}>
<label tabIndex={0} className="btn btn-ghost btn-circle avatar" onClick={toggleDropdown}>
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} alt='' />
                  </div>
                </label>
                {isDropdownOpen && (
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 absolute left-1/2 top-full transform -translate-x-1/2 up-arrow">
                <li>
               <p className="font-semibold">{user?.displayName}</p>
               </li>
                    <li>
                      <Link to="/profile" className="justify-between">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>Logout</button>
                    </li>
                  </ul>
                  )}
    </div>
          ) : (
            <ul className="menu menu-horizontal px-1 items-center">
            <li>
              <NavLink to="/login" activeClassName="active">Login</NavLink>
              </li>
              <li>
              <NavLink to="/signup" activeClassName="active">Signup</NavLink>
              </li>
              <li>
              <FaUserCircle className="text-3xl p-0 ml-2" />
            </li>
        </ul>
          )}
      </div>
    </div>
  );
};

export default Navbar;
