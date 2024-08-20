import React, { useContext } from "react";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";

const DashboardLayout = () => {

  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isModerator] = useModerator(user?.email);

  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
          </div>
        <div className="drawer-side">
          <label
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            
          {
            (isAdmin || isModerator) && <>
            <li>
              <Link to="/dashboard/managemembers" className="font-bold text-base">Manage Members</Link>
            </li>
            <li>
              <Link to="/dashboard/manageadmins" className="font-bold text-base my-3">Manage Admins</Link>
            </li>
            </>
          }
          { isModerator &&
            <li>
              <Link to="/dashboard/managemoderators" className="font-bold text-base">Manage Moderators</Link>
            </li>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;