import React, { useState, useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import ExecutiveMessageModal from "./ExecutiveMessageModal";
import { AuthContext } from "../../../contexts/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useModerator from "../../../hooks/useModerator";

const ExecutiveMessages = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isModerator] = useModerator(user?.email);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const {
    data: executiveMessages,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["executiveMessages"],
    queryFn: async () => {
      try {
        const res = await fetch("https://nsjnu-server.vercel.app/executiveMessages", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleDeleteMessage = async (messageId) => {
    try {
      const res = await fetch(
        `https://nsjnu-server.vercel.app/executiveMessages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.ok) {
        toast.success("Message deleted successfully");
        refetch();
      } else {
        console.error("Failed to delete message:", res.statusText);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {executiveMessages?.map((message) => (
          <div
            key={message._id}
            className="relative card flex flex-col items-center p-6 bg-white rounded-lg shadow-lg"
          >
            {isDeleteMode && (
              <button
                className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-700 hover:bg-red-800 hover:text-white z-10"
                onClick={() => handleDeleteMessage(message._id)}
                data-tooltip-content="Delete this message"
                data-tooltip-id="delete-message"
              >
                <Tooltip id="delete-message" place="top" />
                <FaTrashAlt className="text-lg" />
              </button>
            )}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-[#911632]">
                <img
                  src={message.image}
                  alt={message.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">{message.name}</h3>
              <p className="text-sm text-gray-500">{message.designation}</p>
            </div>

            {/* Quotation Box */}
            <div className="relative mt-6 p-6 bg-gray-100 rounded-2xl border-2 border-[#911632] text-justify">
              {/* Top Left Quotation Mark */}
              <div className="absolute -top-5 left-10 text-white text-6xl rounded-full bg-[#911632] w-10 h-10 text-center font-bold">
                <p className="mt-1">“</p>
              </div>

              {/* Message Text */}
              <p className="text-base text-gray-700">{message.text}</p>

              {/* Bottom Right Quotation Mark */}
              <div className="absolute -bottom-5 right-10 text-white text-6xl rounded-full bg-[#911632] w-10 h-10 text-center font-bold">
              <p className="mt-1">”</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(isAdmin || isModerator) && (
        <div className="flex justify-center gap-4 items-center mt-5 px-4">
          <label htmlFor="executive-message-modal" className="btn btn-primary">
            Add Executive Message
          </label>
          <button
            className="btn btn-outline btn-secondary"
            onClick={() => setIsDeleteMode(!isDeleteMode)}
          >
            {isDeleteMode ? "Cancel" : "Delete"}
          </button>
        </div>
      )}

      <ExecutiveMessageModal refetch={refetch} />
    </div>
  );
};

export default ExecutiveMessages;
