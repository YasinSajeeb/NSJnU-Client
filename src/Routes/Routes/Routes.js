import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import About from "../../Pages/About/About";
import Members from "../../Pages/Members/Members";
import Committee from "../../Pages/Committee/Committee";
import Articles from "../../Pages/Articles/Articles";

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
                path: '/about',
                element: <About></About>
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
                path: '/members',
                element: <Members></Members>
            },
            {
                path: '/executivecommittee',
                element: <Committee></Committee>
            },
            {
                path: '/articles',
                element: <Articles></Articles>
            }
        ]
    }
])

export default router;