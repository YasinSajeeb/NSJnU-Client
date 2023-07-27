import React, { useContext, useEffect, useState } from 'react';
import logo from '../../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLoading } from 'react-icons/ai';

const Navbar = () => {

  const circularImageStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    padding: 0
  };

  const {user, logOut, loading} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set the local state when the loading state in the context changes
    setIsLoading(loading);
  }, [loading]);

  useEffect(() => {
    console.log('Navbar - User:', user);
    console.log('Navbar - Loading:', loading);
  }, [user, loading]);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(err => console.log(err));
  }

  const menuItems = (
    <React.Fragment>
      <li className='hover:bg-green-900 hover:text-white hover:rounded-lg'><Link to='/'>Home</Link></li>
      <li className='hover:bg-green-900 hover:text-white hover:rounded-lg'><Link to='/members'>Members</Link></li>
      <li className='hover:bg-green-900 hover:text-white hover:rounded-lg'><Link to='/notice'>Notice</Link></li>
      <li className='hover:bg-green-900 hover:text-white hover:rounded-lg'><Link to='/about'>About Us</Link></li>
    </React.Fragment>
  );

  return (
    <div className="navbar bg-orange-300">
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
          <img src={logo} alt="" className='w-24' />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems}
        </ul>
      </div>
      <div className="navbar-end">
      <ul className="menu menu-horizontal px-1">
      {isLoading ? (
            <li>
              <AiOutlineLoading className="animate-spin" />
            </li>
          ) : user?.uid ? ( 
            <li className="flex items-center">
              <button
                className="hover:bg-green-900 hover:text-white hover:rounded-lg"
                onClick={handleLogOut}
              >
                Sign Out
              </button>
              <p className="font-semibold">{user?.displayName}</p>
              <div style={circularImageStyle}>
                <img className="w-full h-full object-cover" src={user?.photoURL} alt="" />
              </div>
            </li>
          ) : (
            <li className="hover:bg-green-900 hover:text-white hover:rounded-lg">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              <FaUserCircle className="text-2xl ml-2" />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
