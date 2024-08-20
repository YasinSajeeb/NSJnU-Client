import React from 'react';
import { BsRocket } from 'react-icons/bs';
import { TbBulb } from 'react-icons/tb';

const VisionMission = () => {
    return (
        <div className="flex flex-col md:flex-row md:justify-between py-4 lg:py-10 lg:px-40 items-center bg-[#052e16]">
        <div className="relative glass w-11/12 md:w-2/5 mb-16 md:mb-0 rounded flex justify-center items-center">
          {/* Circle containing the icon */}
          <div className="absolute top-0 transform -translate-y-1/2 bg-[#53705F] border-4 border-[#052e16] rounded-full w-16 h-16 flex justify-center items-center">
            <TbBulb className="text-2xl text-white font-bold" />
          </div>
          {/* Box content */}
          <div className="text-center">
            <h3 className="mt-12 py-4 bg-amber-200 tracking-wide font-extrabold text-black">Vision</h3>
            <p className="text-white font-semibold px-6 my-8 text-justify">Our vision is to establish the Notre Damians Society of Jagannath University as a leading example of social responsibility and community engagement. We aspire to expand our membership and increase our impact on society by continuing our efforts to support the needy, celebrate cultural traditions, and strengthen the bonds among our members. We envision a future where our society not only grows in numbers but also in its ability to make meaningful contributions to the betterment of society and the well-being of our members.</p>
          </div>
          {/* Half-circle cutout */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-8 rounded-b-full"></div>
        </div>

        <div className="relative glass w-11/12 md:w-2/5 rounded flex justify-center items-center">
          {/* Circle containing the icon */}
          <div className="absolute top-0 transform -translate-y-1/2 bg-[#53705F] border-4 border-[#052e16] rounded-full w-16 h-16 flex justify-center items-center">
            <BsRocket className="text-2xl text-white font-bold" />
          </div>
          {/* Box content */}
          <div className="text-center">
            <h3 className="mt-12 py-4 bg-amber-200 tracking-wide font-extrabold text-black">Mission</h3>
            <p className="text-white font-semibold px-6 my-8 text-justify">The mission of the Notre Damians Society of Jagannath University is to foster a strong, supportive community among former Notre Damians who are current or past students of Jagannath University. We aim to promote camaraderie, mutual assistance, and social responsibility through our various activities. Our focus is on providing aid to the underprivileged, organizing charitable events, and offering support to members during challenging times. Through these initiatives, we strive to create a sense of unity and shared purpose within our society.</p>
          </div>
          {/* Half-circle cutout */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-8 rounded-b-full"></div>
        </div>
      </div>
    );
};

export default VisionMission;