import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

const NewCom = ({ hasPresident, hasGeneralSecretary }) => {

  const queryClient = useQueryClient();

  const {register, handleSubmit, reset} = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/executivecommittee';
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddMember = async(data) => {
    console.log(data);
    setIsLoading(true);

    if ((data.position === "President" && hasPresident) || (data.position === "General Secretary" && hasGeneralSecretary)) {
      alert(`There's already a ${data.position} card.`);
      setIsLoading(false);
      return;
    }

    const image = data.image[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("folder", "Committee");
    formData.append("upload_preset", "nsjnu2023");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddng2uach/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary.");
      }

      const imageData = await response.json();
      console.log(imageData);

      const committeeMemberInfo = {
        name: data.name,
        photoURL: imageData.secure_url,
        position: data.position
      }

      fetch('https://nsjnu-server.vercel.app/committeeMembers', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(committeeMemberInfo)
      })
      .then(res => res.json())
      .then(result =>{
        console.log(result)
      })

      await queryClient.invalidateQueries("committeeMembers");
      await queryClient.refetchQueries("committeeMembers");

      setIsLoading(false);
      setIsModalOpen(false);
      reset();
      navigate(from, { replace: true });
    } 
    catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <input type="checkbox" id="newCom-modal" className="modal-toggle" checked={isModalOpen} onChange={handleModalToggle} />
      <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box max-w-sm">
          <label htmlFor="newCom-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
          
          <form onSubmit={handleSubmit(handleAddMember)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type='name' {...register("name")} placeholder="Full Name" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Position in Committee</span>
          </label>
          <input type='text' {...register("position")} placeholder="" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Photo</span>
          </label>
          <input type='file' {...register("image")} placeholder="Submit a photo" accept="image/*" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control modal-action mt-6">
        <button className={`btn btn-primary ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
        {isLoading ? (
          <span>
            <AiOutlineLoading className="animate-spin" /> Loading...
          </span>
        ) : (
          'Add'
        )}
      </button>
        </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default NewCom;
