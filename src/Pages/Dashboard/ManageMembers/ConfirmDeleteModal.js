import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const ConfirmDeleteModal = ({ member, onDeleteConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 animate-fade-in">
        <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-fade-in {
            animation: fadeIn 0.3s ease-in-out;
          }
        `}
      </style>
      <div className="bg-white rounded-lg p-8">
        <h3 className="text-lg font-bold mb-4">
          Are you sure you want to delete <span className='text-red-600'>{member.displayName}</span>'s account?
        </h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="p-2 bg-gray-300 rounded-md text-black hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onDeleteConfirm(member._id, member.uid)}
            className="p-2 bg-red-600 rounded-md text-white hover:bg-red-700 flex items-center"
          >
            <FaTrashAlt className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;