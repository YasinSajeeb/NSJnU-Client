import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import { AuthContext } from "../../../contexts/AuthProvider";
import ConfirmDeleteModal from "./ConfirmDeleteModal"; // Import the modal component

const ManageMembers = () => {
  const { deleteUserProfile, user } = useContext(AuthContext);
  const [selectedMember, setSelectedMember] = useState(null); // State for the selected member to delete
  const { data: members = [], isLoading, refetch } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await fetch('https://nsjnu-server.vercel.app/members?status=approved,pending', {
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleApprove = async (id) => {
    const response = await fetch(`https://nsjnu-server.vercel.app/members/status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ status: 'approved' })
    });
    if (response.ok) {
      refetch();
    }
  };

  const handleDelete = async (id, uid) => {
    const firebaseResponse = await fetch(`https://nsjnu-server.vercel.app/members/firebase/${uid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (firebaseResponse.ok) {
      const response = await fetch(`https://nsjnu-server.vercel.app/members/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.ok) {
        alert('User deleted');
        refetch();
      } else {
        const errorData = await response.json();
        console.error('Error deleting member:', errorData);
        alert('Error deleting member');
      }
    } else {
      const errorData = await firebaseResponse.json();
      console.error('Error deleting Firebase user:', errorData);
      alert('Error deleting Firebase user');
    }
    setSelectedMember(null); // Close the modal after deleting
  };

  const filteredMembers = members.filter(member => member.role !== 'admin' && member.role !== 'moderator');

  return (
    <div>
      <h2 className="text-3xl text-center my-4 font-bold">Manage Members</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, i) => (
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
                  {member.status === 'approved' ? (
                    <span className="badge bg-sky-700 text-white badge-md">approved</span>
                  ) : (
                    <span className="skeleton badge badge-ghost badge-md">pending</span>
                  )}
                </td>
                <td>
                  {member.status === 'pending' && (
                    <button className="p-2 text-blue-900 hover:text-white hover:bg-blue-900 rounded-full me-1"
                      onClick={() => handleApprove(member._id)}>
                      <FaCheck className="text-lg" />
                    </button>
                  )}
                  <button className="p-2 bg-white rounded-full text-red-700 hover:bg-red-800 hover:text-white"
                    onClick={() => setSelectedMember(member)}>
                    <FaTrashAlt className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the modal if a member is selected */}
      {selectedMember && (
        <ConfirmDeleteModal
          member={selectedMember}
          onDeleteConfirm={handleDelete}
          onCancel={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
};

export default ManageMembers;
