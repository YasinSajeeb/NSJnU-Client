import React, { useContext, useState } from 'react';
import './Articles.css';
import ArticleModal from './ArticleModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Shared/Loading/Loading';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { FaTrashAlt } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useModerator from '../../hooks/useModerator';
import toast from 'react-hot-toast';

const Articles = () => {

  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isModerator] = useModerator(user?.email);

  const { data: articles, isLoading, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      try {
        const res = await fetch("https://nsjnu-server.vercel.app/articles", {
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

  const sortedArticles = articles.sort((a, b) => {
    if (!a.createdAt && !b.createdAt) {
      // If both articles have no createdAt timestamp, maintain their original order
      return 0;
    } else if (!a.createdAt) {
      // If only article a has no createdAt timestamp, move it to the end
      return 1;
    } else if (!b.createdAt) {
      // If only article b has no createdAt timestamp, move it to the end
      return -1;
    } else {
      // Sort articles with valid createdAt timestamps in descending order
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const handleDeleteArticle = async (articleId) => {
    try {
      const res = await fetch(`https://nsjnu-server.vercel.app/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (res.ok) {
        toast.success("Article Deleted Successfully");
        // Article successfully deleted from the server, now update the UI
        refetch(); // Refetch articles data to update UI
      } else {
        console.error('Failed to delete article:', res.statusText);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

    return (
        <div className='my-4'>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 mt-10 px-4">
            {sortedArticles.map((article) => (
          <div key={article._id} className='relative'>
            {isDeleteClicked && (
              <button
                className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-700 hover:bg-red-800 hover:text-white focus:outline-none z-10"
                data-tooltip-content="Delete this article"
                data-tooltip-id="delete-article"
                onClick={() => handleDeleteArticle(article._id)}
              >
                <Tooltip id="delete-article" place="top" />
                <FaTrashAlt className="text-lg shivering" />
              </button>
            )}
              <Link to={`/articles/${article._id}`}>
            <div className="card w-auto bg-gradient-to-br from-lime-800 via-lime-900 to-lime-950 shadow-xl">
              <figure>
                <img
                  src={article.photoURL}
                  alt=""
                  className="rounded-xl object-cover w-full h-44 md:h-60 lg:h-64"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-white text-sm md:text-base lg:text-lg">{article.title}</h2>
                <p className="text-gray-400 text-xs md:text-sm mt-2">
                {article.createdAt ? (
                  `Posted ${formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}`
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
      { (isAdmin || isModerator) &&
        <>
      <div className='flex justify-center gap-4 items-center mt-5 px-4'>
             <label htmlFor="article-modal" className="btn btn-article">
               Post an article
             </label>
             <div className='btn btn-delete' onClick={() => setIsDeleteClicked(!isDeleteClicked)}>
             {isDeleteClicked ? 'Cancel' : 'Delete'}
             </div>
           </div>
           <ArticleModal></ArticleModal>
           </>
           }
        </div>
    );
};


export default Articles;