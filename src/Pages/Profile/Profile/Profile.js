import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { TbEdit } from "react-icons/tb";
import Loading from '../../Shared/Loading/Loading';
import EditModal from '../EditModal/EditModal';
import { Tooltip } from 'react-tooltip';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const Profile = () => {

  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('professional');
  const [queryEnabled, setQueryEnabled] = useState(false);

  useEffect(() => {
    if (user) {
      setQueryEnabled(true);
    }
  }, [user]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      try {
        const res = await fetch(`https://nsjnu-server.vercel.app/users/${user.email}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await res.json();
        return data;
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw new Error('Failed to fetch user data');
      }
    },
    enabled: queryEnabled, // Enable the query when queryEnabled is true
  });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (!user) {
      return <Loading></Loading>;
    }

    if (isLoading) {
      return <Loading></Loading>;
    }
  
    if (isError) {
      return <div>Error fetching user data</div>;
    }

  return (
    <div className='flex flex-col gap-4 md:flex-row px-5 py-10'>
            <div className='bg-lime-950 py-10 md:w-1/4 rounded-xl text-center relative'>
            <label htmlFor="edit-modal">
            <TbEdit className='text-white text-xl absolute cursor-pointer top-0 right-0 mt-2 mr-2' data-tooltip-content="Edit Your Profile" data-tooltip-id="edit-tooltip" />
            <Tooltip id="edit-tooltip" place="top" />
            </label>
            <PhotoProvider>
              <PhotoView src={data.photoURL}>
              <img src={data.photoURL} alt='' className='w-52 h-52 mx-auto rounded-full object-cover cursor-pointer'/>
              </PhotoView>
            </PhotoProvider>
                <p className='text-2xl font-semibold tracking-normal capitalize text-yellow-200 mt-5'>{data.displayName}</p>
                <p className='text-md font-medium text-slate-300 mt-3'>{data.email}</p>
                {data.mobileNumber && (
                <span className='text-md font-medium text-slate-300'>+{data.mobileNumber}</span>
                )}
            </div>
            <div className='bg-lime-950 md:w-3/4 rounded-xl'>
            <div className='flex justify-center space-x-4'>
                    <button
                        className={`text-white py-2 flex-grow rounded-lg focus:outline-none transition duration-300 ${
                            activeTab === 'professional'
                                ? 'bg-orange-700'
                                : 'bg-orange-400'
                        }`}
                        onClick={() => handleTabChange('professional')}
                    >
                        Professional Information
                    </button>
                    <button
                        className={`text-white py-2 flex-grow rounded-lg focus:outline-none ${
                            activeTab === 'Address' ? 'bg-orange-700' : 'bg-orange-400'
                        }`}
                        onClick={() => handleTabChange('Address')}
                    >
                        Address
                    </button>
                    <button
                        className={`text-white py-2 flex-grow rounded-lg focus:outline-none ${
                            activeTab === 'OtherInfo' ? 'bg-orange-700' : 'bg-orange-400'
                        }`}
                        onClick={() => handleTabChange('OtherInfo')}
                    >
                        Other Information
                    </button>
                </div>
                {activeTab === 'professional' && (
                    <div className='md:grid md:grid-cols-2'>
                    <div>
                    <div className='mt-6 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Currently Working in</p>
                        <p className='text-slate-200 text-md mt-2'>{data.companyName}</p>
                    </div>
                    <div className='mt-10 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Designation</p>
                        <p className='text-slate-200 text-md mt-2'>{data.designation}</p>
                    </div>
                    </div>
                    <div>
                    <div className='mt-6 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Internship Institute</p>
                        <p className='text-slate-200 text-md mt-2'>{data.internship1}</p>
                    </div>
                    <div className='mt-6 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Internship Institute</p>
                        <p className='text-slate-200 text-md mt-2'>{data.internship2}</p>
                    </div>
                    </div>
                    </div>
                )}
                {activeTab === 'Address' && (
                    <div className='md:grid md:grid-cols-2'>
                    <div>
                    <div className='mt-6 ps-10'>
                        <h4 className='text-2xl text-yellow-300 font-bold'>Present Address</h4>
                        <p className='text-slate-400 text-lg mt-4'>Street Address</p>
                        <p className='text-slate-200 text-md mt-2'>{data.presentAddressStreet}</p>
                    </div>
                    <div className='mt-10 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>District</p>
                        <p className='text-slate-200 text-md mt-2'>{data.presentAddressDistrict}</p>
                    </div>
                    </div>
                    <div>
                    <div className='mt-6 ps-10'>
                        <h4 className='text-2xl text-yellow-300 font-bold'>Permanent Address</h4>
                        <p className='text-slate-400 text-lg mt-4'>Street Address</p>
                        <p className='text-slate-200 text-md mt-2'>{data.permanentAddressStreet}</p>
                    </div>
                    <div className='mt-10 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>District</p>
                        <p className='text-slate-200 text-md mt-2'>{data.permanentAddressDistrict}</p>
                    </div>
                    </div>
                    </div>
                )}   
                {activeTab === 'OtherInfo' && (
                    <div className='md:grid md:grid-cols-2'>
                    <div className='md:w-1/2'>
                    <div className='mt-6 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Department</p>
                        <p className='text-slate-200 text-lg mt-2'>{data.department}</p>
                    </div>
                    <div className='mt-10 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Blood Group</p>
                        <p className='text-slate-200 text-lg mt-2'>{data.bloodGroup}</p>
                    </div>
                    </div>
                    <div className='md:w-1/2'>
                    <div className='mt-6 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Batch No</p>
                        <p className='text-slate-200 text-lg mt-2'>{data.batch}</p>
                    </div>
                    </div>
                    </div>
                )}  
            </div>
            <EditModal userData={data}></EditModal>
        </div>
  );
};

export default Profile;
