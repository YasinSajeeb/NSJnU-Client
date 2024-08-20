import React from 'react';
import Lottie from "lottie-react";
import AccessAnimation from "../../assets/Access Animation/Access_Animation.json";
import { Link } from 'react-router-dom';

const Redirect = () => {
    return (
        <div className='mb-10'>
            <Lottie animationData={AccessAnimation} className="w-1/2 md:w-1/3 lg:w-1/4 mx-auto" />
            <h3 className='text-base px-3 md:text-xl lg:text-3xl text-center font-bold text-lime-950 font-sans'>Only members of the society are allowed to see the list</h3>
            <p className='text-center text-xs md:text-lg font-medium mt-5 tracking-wide'>To become a member, please  <Link to="/signup" className='text-sky-700 font-bold hover:underline'>Sign in</Link></p>
        </div>
    );
};

export default Redirect;