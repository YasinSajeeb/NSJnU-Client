import React, { useContext, useState } from 'react';
import './Interns.css';
import { AuthContext } from '../../../../contexts/AuthProvider';
import useAdmin from '../../../../hooks/useAdmin';
import useModerator from '../../../../hooks/useModerator';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import InternModal from './InternModal';

const Interns = () => {

    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isModerator] = useModerator(user?.email);
  
    const { data: interns, isLoading, refetch } = useQuery({
      queryKey: ["interns"],
      queryFn: async () => {
        try {
          const res = await fetch("http://localhost:5000/career/interns", {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          const data = await res.json();
          return data;
        } catch (error) {}
      },
    });
  
    const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  
    if (isLoading) {
      return <Loading></Loading>;
    }
  
    const sortedInterns = interns.sort((a, b) => {
      if (!a.createdAt && !b.createdAt) {
        return 0;
      } else if (!a.createdAt) {
        return 1;
      } else if (!b.createdAt) {
        return -1;
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  
    const handleDeleteIntern = async (internId) => {
      try {
        const res = await fetch(`http://localhost:5000/career/interns/${internId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (res.ok) {
          toast.success("Intern Deleted Successfully");
          refetch();
        } else {
          console.error('Failed to delete intern:', res.statusText);
        }
      } catch (error) {
        console.error('Error deleting intern:', error);
      }
    };
  
    return (
      <div className='my-4'>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 mt-10 px-4">
          {sortedInterns.map((intern) => (
            <div key={intern._id} className='relative'>
              {isDeleteClicked && (
                <button
                  className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-700 hover:bg-red-800 hover:text-white focus:outline-none z-10"
                  data-tooltip-content="Delete this intern"
                  data-tooltip-id="delete-intern"
                  onClick={() => handleDeleteIntern(intern._id)}
                >
                  <Tooltip id="delete-intern" place="top" />
                  <FaTrashAlt className="text-lg shivering" />
                </button>
              )}
              <Link to={`/career/interns/${intern._id}`}>
                <div className="card interns-card w-auto bg-gradient-to-br from-lime-800 via-lime-900 to-lime-950 shadow-xl">
                  <figure>
                    <img
                      src={intern.photoURL}
                      alt=""
                      className="rounded-xl object-cover w-full h-44 md:h-60 lg:h-64"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title text-white text-sm md:text-base lg:text-lg">{intern.title}</h2>
                    <p className="text-gray-400 text-xs md:text-sm mt-2">
                      {intern.createdAt ? (
                        `Posted ${formatDistanceToNow(new Date(intern.createdAt), { addSuffix: true })}`
                      ) : (
                        `Posted: N/A`
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {(isAdmin || isModerator) &&
          <>
            <div className='flex justify-center gap-4 items-center mt-5 px-4'>
              <label htmlFor="intern-modal" className="btn btn-intern">
                Post an intern
              </label>
              <div className='btn btn-delete' onClick={() => setIsDeleteClicked(!isDeleteClicked)}>
                {isDeleteClicked ? 'Cancel' : 'Delete'}
              </div>
            </div>
            <InternModal></InternModal>
          </>
        }
      </div>
    );
  };

export default Interns;