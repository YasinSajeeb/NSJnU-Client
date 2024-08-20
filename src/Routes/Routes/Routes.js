import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import Committee from "../../Pages/Committee/Committee";
import Articles from "../../Pages/Articles/Articles";
import MemberDetails from "../../Pages/MemberDetails/MemberDetails";
import Profile from "../../Pages/Profile/Profile/Profile";
import ArticleDetails from "../../Pages/ArticleDetails/ArticleDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../../Layout/DashboardLayout";
import ManageMembers from "../../Pages/Dashboard/ManageMembers/ManageMembers";
import ManageAdmins from "../../Pages/Dashboard/ManageAdmins/ManageAdmins";
import AdminRoute from "../AdminRoute/AdminRoute";
import ManageModerators from "../../Pages/Dashboard/ManageModerators/ManageModerators";
import ModeratorRoute from "../ModeratorRoute/ModeratorRoute";
import Jobs from "../../Pages/Career/Jobs/Jobs";
import JobDetails from "../../Pages/Career/Jobs/JobDetails/JobDetails";
import Interns from "../../Pages/Career/Interns/Interns/Interns";
import InternDetails from "../../Pages/Career/Interns/InternDetails/InternDetails";
import OrganizationHistory from "../../Pages/About/OrganizationHistory/OrganizationHistory";
import VisionMission from "../../Pages/About/VisionMission/VisionMission";
import GeneralMembers from "../../Pages/Members/GeneralMembers/GeneralMembers";
import Sponsors from "../../Pages/Members/Sponsors/Sponsors";
import ExecutiveMessages from "../../Pages/About/ExecutiveMessages/ExecutiveMessages";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/organizationhistory',
                element: <OrganizationHistory></OrganizationHistory>
            },
            {
                path: '/aboutus/visionmission',
                element: <VisionMission></VisionMission>
            },
            {
                path: '/aboutus/executivemessages',
                element: <ExecutiveMessages></ExecutiveMessages>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/members/generalmembers',
                element: <PrivateRoute><GeneralMembers></GeneralMembers></PrivateRoute>
            },
            {
                path: '/members/:id',
                element: <MemberDetails></MemberDetails>,
                loader: ({params}) => fetch(`https://nsjnu-server.vercel.app/members/${params.id}`)
            },
            {
                path: '/members/executivecommittee',
                element: <Committee></Committee>
            },
            {
                path: '/members/sponsors',
                element: <Sponsors></Sponsors>
            },
            {
                path: '/articles',
                element: <Articles></Articles>
            },
            {
                path: '/articles/:id',
                element: <ArticleDetails></ArticleDetails>,
                loader: ({params}) => fetch(`https://nsjnu-server.vercel.app/articles/${params.id}`)
            },
            {
                path: '/opportunities/jobs',
                element: <Jobs></Jobs>
            },
            {
                path: "/opportunities/jobs/:id",
                element: <JobDetails></JobDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/career/jobs/${params.id}`)
            },
            {
                path: "/opportunities/interns",
                element: <Interns></Interns>
            },
            {
                path: "/opportunities/interns/:id",
                element: <InternDetails></InternDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/career/interns/${params.id}`)
            }
        ]
    },
    {
        path: '/dashboard',
        element: <AdminRoute><DashboardLayout></DashboardLayout></AdminRoute>,
        children: [
            {
                path: '/dashboard/managemembers',
                element: <ManageMembers></ManageMembers>
            },
            {
                path: '/dashboard/manageadmins',
                element: <ManageAdmins></ManageAdmins>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <ModeratorRoute><DashboardLayout></DashboardLayout></ModeratorRoute>,
        children: [
            {
                path: '/dashboard/managemoderators',
                element: <ManageModerators></ManageModerators>
            }
        ]
    }
])

export default router;