import React, { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useLoaderData } from 'react-router-dom';
import 'react-photo-view/dist/react-photo-view.css';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import Loading from '../Shared/Loading/Loading';

const MemberDetails = () => {
    const memberDetails = useLoaderData();
    const {displayName, email, mobileNumber, photoURL, ...otherUserInfo} = memberDetails;

    const [activeTab, setActiveTab] = useState('professional');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    
    // const { memberId } = useParams();

    // const { data: member, isLoading, isError, error } = useQuery({
    //     queryKey: ['members', memberId],
    //     queryFn: async (memberId) => {
    //         try {
    //             const response = await fetch(`https://nsjnu-server.vercel.app/members/${memberId}`);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch member data');
    //             }
    //             return await response.json();
    //         } catch (error) {
    //             throw new Error(`Error fetching member data: ${error.message}`);
    //         }
    //     },
    // });

    // if (isLoading) {
    //     return <Loading />;
    // }

    // if (isError) {
    //     return <div>Error: {error.message}</div>;
    // }

    return (
        <div className='flex flex-col gap-4 md:flex-row px-5 py-10'>
            <div className='bg-gradient-to-r from-green-900 via-lime-900 to-lime-950 py-10 md:w-1/4 rounded-xl text-center'>
            <PhotoProvider>
              <PhotoView src={photoURL}>
              <img src={photoURL} alt='' className='w-56 h-56 p-0.5 mx-auto rounded-full border-4 border-blue-800 hover:border-blue-700 object-cover cursor-pointer'/>
              </PhotoView>
            </PhotoProvider>
                <p className='text-2xl font-semibold tracking-normal capitalize text-yellow-200 mt-5'>{displayName}</p>
                <p className='text-md font-medium text-slate-300 mt-3'>{email}</p>
                {mobileNumber && (
                <span className='text-md font-medium text-slate-300'>+{mobileNumber}</span>
                )}
            </div>
            <div className='bg-gradient-to-l from-green-900 via-lime-900 to-lime-950 md:w-3/4 rounded-xl'>
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
                        <p className='text-slate-200 text-md mt-2'>{otherUserInfo.companyName}</p>
                    </div>
                    <div className='mt-10 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Designation</p>
                        <p className='text-slate-200 text-md mt-2'>{otherUserInfo.designation}</p>
                    </div>
                    </div>
                    <div>
                    <div className='mt-6 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Internship Institute</p>
                        <p className='text-slate-200 text-md mt-2'>{otherUserInfo.internship1}</p>
                    </div>
                    <div className='mt-6 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Internship Institute</p>
                        <p className='text-slate-200 text-md mt-2'>{otherUserInfo.internship2}</p>
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
                        <p className='text-slate-200 text-md mt-2'>{otherUserInfo.presentAddressStreet}</p>
                    </div>
                    <div className='mt-10 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>District</p>
                        <p className='text-slate-200 text-md mt-2'>{otherUserInfo.presentAddressDistrict}</p>
                    </div>
                    </div>
                    <div>
                    <div className='mt-6 ps-10'>
                        <h4 className='text-2xl text-yellow-300 font-bold'>Permanent Address</h4>
                        <p className='text-slate-400 text-lg mt-4'>Street Address</p>
                        <p className='text-slate-200 text-md mt-2'>{otherUserInfo.permanentAddressStreet}</p>
                    </div>
                    <div className='mt-10 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>District</p>
                        <p className='text-slate-200 text-md mt-2'>{otherUserInfo.permanentAddressDistrict}</p>
                    </div>
                    </div>
                    </div>
                )}  

                {activeTab === 'OtherInfo' && (
                    <div className='md:grid md:grid-cols-2'>
                    <div>
                    <div className='mt-6 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Department</p>
                        <p className='text-slate-200 text-md mt-2'>{otherUserInfo.department}</p>
                    </div>
                    <div className='mt-10 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Blood Group</p>
                        <p className='text-slate-200 text-md mt-2'>{otherUserInfo.bloodGroup}</p>
                    </div>
                    </div>
                    <div>
                    <div className='mt-6 ps-10'>
                        <p className='text-slate-400 text-lg mt-4'>Batch No</p>
                        <p className='text-slate-200 text-md mt-2'>{otherUserInfo.batch}</p>
                    </div>
                    </div>
                    </div>
                )}  
            </div>
            
        </div>
        // <div className="container mx-auto p-8">
        //     <div className="max-w-4xl mx-auto">
        //         <h2 className="text-3xl font-bold mb-4">Member Details</h2>
                
        //             <div className="bg-white shadow-md rounded-lg p-6">
        //                 <div className="flex items-center justify-center mb-6">
        //                     <img src={photoURL} alt="Member Avatar" className="w-24 h-24 rounded-full" />
        //                 </div>
        //                 <div>
        //                     <h3 className="text-xl font-semibold">{displayName}</h3>
        //                     <p className="text-gray-600">{email}</p>
        //                     <p className="text-gray-600">{mobileNumber}</p>
        //                 </div>
        //                 <div className="mt-4">
        //                     <h4 className="text-lg font-semibold">Professional Information</h4>
        //                     <p><strong>Company:</strong> {companyName}</p>
        //                     <p><strong>Designation:</strong> {designation}</p>
        //                 </div>
        //                 <div className="mt-4">
        //                     <h4 className="text-lg font-semibold">Address</h4>
        //                     <p>{address}</p>
        //                 </div>
        //                 <div className="mt-4">
        //                     <h4 className="text-lg font-semibold">Other Information</h4>
        //                     <p><strong>Batch:</strong> {batch}</p>
        //                     <p><strong>Department:</strong> {department}</p>
        //                     <p><strong>Blood Group:</strong> {bloodGroup}</p>
        //                 </div>
        //             </div>
        //     </div>
        // </div>
    );
};

export default MemberDetails;
