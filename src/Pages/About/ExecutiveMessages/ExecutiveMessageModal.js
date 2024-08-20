import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Cropper from 'react-easy-crop';
import toast from 'react-hot-toast';
import getCroppedImg from '../../../utils/getCroppedImg';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';

const ExecutiveMessageModal = ({ refetch }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(false);

  const handleAddMessage = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', croppedImage || image); // Use cropped image or original image if not cropped
      formData.append('folder', 'ExecutiveMessages');
      formData.append('upload_preset', 'nsjnu2023');

      const imageResponse = await fetch('https://api.cloudinary.com/v1_1/ddng2uach/image/upload', {
        method: 'POST',
        body: formData,
      });

      const imageData = await imageResponse.json();

      const messageInfo = {
        name: data.name,
        designation: data.designation,
        image: imageData.secure_url,
        text: data.text,
        createdAt: new Date().toISOString(),
      };

      await fetch('https://nsjnu-server.vercel.app/executiveMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageInfo),
      });

      toast.success('Executive message added successfully!');
      refetch();
      reset();
      setImage(null);
      setCroppedImage(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add message.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImage(reader.result);
        setShowCropper(true);
      };
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleCropImage = async () => {
    try {
      const croppedImg = await getCroppedImg(image, croppedArea);
      setCroppedImage(croppedImg);
      setShowCropper(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <input type="checkbox" id="executive-message-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="executive-message-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="font-bold text-lg mb-4">Add Executive Message</h3>
          <form onSubmit={handleSubmit(handleAddMessage)}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="input input-bordered"
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Designation</span>
              </label>
              <input
                type="text"
                {...register('designation', { required: true })}
                className="input input-bordered"
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  {...register('image', { required: true })}
                  accept="image/*"
                  onChange={onSelectFile}
                  className="hidden" // Hide the default file input
                />
                {croppedImage ? (
                  <div className="relative w-20 h-20 rounded border border-gray-300">
                    <img
                      src={URL.createObjectURL(croppedImage)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow"
                      onClick={() => setShowCropper(true)}
                    >
                      <AiOutlineEdit size={18} />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="imageUpload"
                    className="flex items-center justify-center w-20 h-20 bg-gray-100 border border-dashed border-gray-300 cursor-pointer rounded"
                    onClick={() => document.querySelector('input[type="file"]').click()}
                  >
                    <span className="text-gray-500">Select Image</span>
                  </label>
                )}
              </div>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                {...register('text', { required: true })}
                className="textarea textarea-bordered"
              ></textarea>
            </div>
            <div className="form-control mt-6 modal-action">
              <button className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Message'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Cropper Modal */}
      {showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-11/12 max-w-lg bg-white rounded-lg p-4 z-50">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
              onClick={() => setShowCropper(false)}
            >
              <AiOutlineClose size={24} />
            </button>
            <div className="relative w-full h-80">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button className="btn btn-primary" onClick={handleCropImage}>
                Crop & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExecutiveMessageModal;
