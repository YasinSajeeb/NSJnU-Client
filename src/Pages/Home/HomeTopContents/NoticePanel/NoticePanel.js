import React from 'react';
import "./NoticePanel.css";

const NoticePanel = () => {
    return (
        <div className="notice-container py-6 flex items-center rounded-none">
            <p className="notice-label text-yellow-200 font-bold tracking-wider">
                📢 Notice:
            </p>
            <div className="notice-text-wrapper">
                <span className='notice-text text-yellow-200 w-full font-semibold tracking-wider'>
                    Mohammad Mamun Bhuiyan has been appointed as new Chief Advisor!!
                </span>
            </div>
        </div>
    );
};

export default NoticePanel;
