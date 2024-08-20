import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useModerator from '../../../hooks/useModerator';
import { AuthContext } from '../../../contexts/AuthProvider';

const ManageAdmins = () => {

  const { user } = useContext(AuthContext);
  const [isModerator] = useModerator(user?.email);


  // const [currentUserRole, setCurrentUserRole] = useState('');

  //   useEffect(() => {
  //       // Fetch the current user's role, assuming it's stored in local storage or can be fetched from an API
  //       const fetchUserRole = async () => {
  //           const res = await fetch('https://nsjnu-server.vercel.app/currentUser', {
  //               headers: {
  //                   authorization: `bearer ${localStorage.getItem('accessToken')}`
  //               }
  //           });
  //           const data = await res.json();
  //           setCurrentUserRole(data.role);
  //       };

  //       fetchUserRole();
  //   }, []);

    const { data: members = [], refetch } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
          const res = await fetch('https://nsjnu-server.vercel.app/members?status=approved', {
            headers: {
              authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
          });
          const data = await res.json();
          return data;
        }
      });

      // Filter out moderators from the members list
      const admins = members.filter(member => member.role !== 'moderator');
    
      const handleMakeAdmin = id => {
        fetch(`https://nsjnu-server.vercel.app/members/admin/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount > 0) {
              alert('Make admin successful.');
              refetch();
            }
          });
      };
    
      const handleDemote = id => {
        fetch(`https://nsjnu-server.vercel.app/members/demote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('Demote successful.');
                refetch();
            }
        });
      };

    return (
        <div>
      <h2 className="text-3xl text-center my-4 font-bold">Manage Admins</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Promote</th>
              { isModerator &&
              <th>Demote</th>
              }
            </tr>
          </thead>
          <tbody>
            {admins.map((member, i) => (
              <tr key={member._id}>
                <th>{i + 1}</th>
                <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={member.photoURL} alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              </div>
          </td>
                <td><Link to={`/members/${member._id}`}>{member.displayName}</Link></td>
                <td>{member.email}</td>
                <td>
                <button
                    onClick={() => handleMakeAdmin(member._id)}
                    className={`border-2 ${member.role === 'admin' ? 'skeleton bg-blue-800 text-white cursor-text' : 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white'} rounded-md px-1 font-semibold`}
                    disabled={member.role === 'admin'}>
                    {member.role === 'admin' ? 'Admin' : 'Make Admin'}
                  </button>
                </td>
                {isModerator && (
                <td>
                <button
                    onClick={() => handleDemote(member._id)}
                    className={`border-2 ${member.role !== 'admin' ? 'border-gray-500 text-gray-500 cursor-text' : 'border-red-700 text-red-700 hover:bg-red-700 hover:text-white'} rounded-md px-1 font-semibold`}
                    disabled={member.role !== 'admin'}>
                    {member.role !== 'admin' ? 'Demote' : 'Demote'}
                  </button>
                </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ManageAdmins;
