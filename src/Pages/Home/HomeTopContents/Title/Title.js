// import React from 'react';
// import logo from "../../../../assets/logo.png";

// const Title = () => {
//     return (
//         <div className="flex flex-row justify-center gap-4 items-center bg-[#D0D0D0]">
//             <div className="">
//                 <img src={logo} alt="logo"  className="w-32 float-right"/>
//             </div>
//             <div className='w-5/12'>
//                 <h2 style={{ fontFamily: 'Lobster, sans-serif', margin: '10px 0' }} className="text-5xl tracking-wider text-[#911632] font-extrabold">Notre Damians Society <br /> of Jagannath University</h2>
//                 <h4 style={{ fontFamily: 'Lobster, sans-serif', margin: '10px 0' }} className="text-3xl font-bold tracking-wider text-[#F38826]">Feel better, when we are together</h4>
//             </div>
//         </div>
//     );
// };

// export default Title;

import React, { useState, useEffect } from 'react';
import logo from "../../../../assets/logo.png";

const Title = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(true);
        }, 2000); // Delay before the title starts moving

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            // className={`transition-all duration-[2s] ease-in-out ${
            //     animate ? 'bg-[#D0D0D0]' : 'h-screen bg-white flex justify-center items-center'
            // }`}
        >
            <div className="flex flex-row justify-center gap-4 items-center">
                <div>
                    <img
                        src={logo}
                        alt="logo"
                        className={`transition-all duration-[2s] ${
                            animate ? 'w-16 md:w-24 lg:w-32' : 'w-24 md:w-32 lg:w-48'
                        }`} // Larger size when centered, shrinks during animation
                    />
                </div>
                <div className={`transition-all duration-[2s] ${animate ? 'md:w-3/12 lg:w-5/12' : 'md:w-7/12 lg:w-10/12'}`}>
                    <h2
                        style={{ fontFamily: 'Lobster, sans-serif', margin: '10px 0' }}
                        className={`transition-all duration-[2s] ${
                            animate ? 'text-2xl md:text-3xl lg:text-5xl' : 'text-4xl md:text-5xl lg:text-8xl'
                        } tracking-wider text-[#911632] font-extrabold text-center`}
                    >
                        Notre Damians Society <br /> of Jagannath University
                    </h2>
                    <h4
                        style={{ fontFamily: 'Lobster, sans-serif', margin: '10px 0' }}
                        className={`transition-all duration-[2s] ${
                            animate ? 'text-lg md:text-xl lg:text-3xl' : 'text-2xl md:text-3xl lg:text-6xl'
                        } font-bold tracking-wider text-[#F38826] text-center`}
                    >
                        Feel better, when we are together
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default Title;
