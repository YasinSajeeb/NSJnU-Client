import React, { useContext, useState } from 'react';
import './Jobs.css';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FaTrashAlt } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import toast from 'react-hot-toast';
import useAdmin from '../../../hooks/useAdmin';
import Loading from '../../Shared/Loading/Loading';
import useModerator from '../../../hooks/useModerator';
import { AuthContext } from '../../../contexts/AuthProvider';
import JobModal from './JobModal';

const Jobs = () => {

  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isModerator] = useModerator(user?.email);

  const { data: jobs, isLoading, refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/career/jobs", {
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

  const sortedJobs = jobs.sort((a, b) => {
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

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await fetch(`http://localhost:5000/career/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.ok) {
        toast.success("Job Deleted Successfully");
        refetch();
      } else {
        console.error('Failed to delete job:', res.statusText);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className='my-4'>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 mt-10 px-4">
        {sortedJobs.map((job) => (
          <div key={job._id} className='relative'>
            {isDeleteClicked && (
              <button
                className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-700 hover:bg-red-800 hover:text-white focus:outline-none z-10"
                data-tooltip-content="Delete this job"
                data-tooltip-id="delete-job"
                onClick={() => handleDeleteJob(job._id)}
              >
                <Tooltip id="delete-job" place="top" />
                <FaTrashAlt className="text-lg shivering" />
              </button>
            )}
            <Link to={`/career/jobs/${job._id}`}>
              <div className="card job-card w-auto bg-gradient-to-br from-lime-800 via-lime-900 to-lime-950 shadow-xl">
                <figure>
                  <img
                    src={job.photoURL}
                    alt=""
                    className="rounded-xl object-cover w-full h-44 md:h-60 lg:h-64"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-white text-sm md:text-base lg:text-lg">{job.title}</h2>
                  <p className="text-gray-400 text-xs md:text-sm mt-2">
                    {job.createdAt ? (
                      `Posted ${formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}`
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
            <label htmlFor="job-modal" className="btn btn-job">
              Post a job
            </label>
            <div className='btn btn-delete' onClick={() => setIsDeleteClicked(!isDeleteClicked)}>
              {isDeleteClicked ? 'Cancel' : 'Delete'}
            </div>
          </div>
          <JobModal></JobModal>
        </>
      }
    </div>
  );
};

export default Jobs;