import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Members = () => {

  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      try{
        const res = await fetch('http://localhost:5000/members', {
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const data = await res.json();
        return data;
      }
      catch(error){

      }
    }
  })

    return (
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Photo</th>
        <th>Name</th>
        <th>Job</th>
        <th>Batch</th>
        <th>Blood Group</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        members.map((member, i) => <tr key={member._id}>
          <th>{i + 1}</th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              </div>
          </td>
          <td>
              <div>
                <div className="font-bold">{member.name}</div>
                <div className="text-sm opacity-50">{member.department}</div>
              </div>
          </td>
          <td>
            {member.companyName}
            <br/>
            <span className="badge badge-ghost badge-sm">{member.designation}</span>
          </td>
          <td>{member.batch}</td>
          <th>
            <button className="btn btn-ghost btn-xs">{member.bloodGroup}</button>
          </th>
        </tr>)
      }
    </tbody>
  </table>
</div>
    );
};

export default Members;