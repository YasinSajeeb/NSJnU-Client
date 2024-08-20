// import React from 'react';
// import { Outlet, useLocation } from 'react-router-dom';
// import Footer from '../Pages/Shared/Footer/Footer';
// import Title from '../Pages/Home/HomeTopContents/Title/Title';
// import NoticePanel from '../Pages/Home/HomeTopContents/NoticePanel/NoticePanel';
// import Navbar from '../Pages/Shared/Navbar/Navbar';

// const Main = () => {
//     const location = useLocation();
//     const isHomePage = location.pathname === '/';

//     return (
//         <div>
//             {isHomePage && (
//                 <>
//                     <Title></Title>
//                     <NoticePanel></NoticePanel>
//                 </>
//             )}
//             <Navbar></Navbar>
//             <Outlet></Outlet>
//             <Footer></Footer>
//         </div>
//     );
// };

// export default Main;

import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Title from '../Pages/Home/HomeTopContents/Title/Title';
import NoticePanel from '../Pages/Home/HomeTopContents/NoticePanel/NoticePanel';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (isHomePage) {
            const timer = setTimeout(() => {
                setShowContent(true);
            }, 3000); // The time to wait before showing the rest of the homepage (after the title animation)
            return () => clearTimeout(timer);
        }
    }, [isHomePage]);

    return (
        <div>
            {/* {isHomePage && (
                <>
                    <Title />
                    {showContent && <NoticePanel />}
                </>
            )} */}
            {showContent && (
                <>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </>
            )}
        </div>
    );
};

export default Main;
