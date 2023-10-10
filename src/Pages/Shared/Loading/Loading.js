import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span className="visually-hidden"><AiOutlineLoading3Quarters></AiOutlineLoading3Quarters></span>
            </div>
        </div>
    );
};

export default Loading;