import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';

const ManageModerators = () => {
  const { data: members = [], refetch, isLoading, isError, error } = useQuery({
      queryKey: ['members'],
      queryFn: async () => {
        const res = await fetch('https://nsjnu-server.vercel.app/members?status=approved', {
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      }
    });
  
    if (isLoading) {
      return <Loading />;
    }
  
    if (isError) {
      return <div>Error: {error.message}</div>;
    }

    const admins = members.filter(member => member.role === 'admin');
    const moderators = members.filter(member => member.role === 'moderator');
  
    const handleMakeModerator = id => {
      fetch(`https://nsjnu-server.vercel.app/members/moderator/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.modifiedCount > 0) {
            alert('Make Moderator successful.');
            refetch();
          }
        });
    };
  
    const handleDemoteModerator = id => {
      fetch(`https://nsjnu-server.vercel.app/members/moderator/demote/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
      })
      .then(res => res.json())
      .then(data => {
          if(data.modifiedCount > 0){
              alert('Demote to Admin successful.')
              refetch();
          }
      });
  };

  return (
      <div>
          <h2 className="text-3xl text-center my-4 font-bold">Manage Moderators</h2>
          <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Promote</th>
            <th>Demote</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, i) => (
            <tr key={admin._id}>
              <th>{i + 1}</th>
              <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={admin.photoURL} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            </div>
        </td>
              <td>{admin.displayName}</td>
              <td>{admin.email}</td>
              <td>
              <button
              onClick={() => handleMakeModerator(admin._id)}
              className={`border-2 ${admin.role === 'moderator' ? 'skeleton bg-yellow-400 text-black cursor-text' : 'border-yellow-400 text-black hover:bg-yellow-400 hover:text-black'} rounded-md px-1 font-semibold`}
              disabled={admin.role === 'moderator'}>
              {admin.role === 'moderator' ? 'Moderator' : 'Make Moderator'}
                </button>
              </td>
              <td>
              <button onClick={() => handleDemoteModerator(admin._id)}
                  className={`border-2 ${admin.role !== 'moderator' ? 'border-gray-500 text-gray-500 cursor-text' : 'border-red-700 text-red-700 hover:bg-red-700 hover:text-white'} rounded-md px-1 font-semibold`}
                  disabled={admin.role !== 'moderator'}>
                    {admin.role !== 'moderator' ? 'Demote' : 'Demote'}
                </button>
              </td>
            </tr>
          ))}
          {moderators.map((moderator, i) => (
            <tr key={moderator._id}>
              <th>{admins.length + i + 1}</th>
              <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={moderator.photoURL} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            </div>
        </td>
              <td>{moderator.displayName}</td>
              <td>{moderator.email}</td>
              <td>
              <button
              className="border-2 skeleton bg-yellow-400 text-black cursor-text rounded-md px-1 font-semibold"
              disabled>
              Moderator
                </button>
              </td>
              <td>
              <button onClick={() => handleDemoteModerator(moderator._id)}
                  className="border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white rounded-md px-1 font-semibold">
                    Demote
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
  );
};

export default ManageModerators;