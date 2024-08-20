import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AiOutlineLoading } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Quill from 'quill';

const ArticleModal = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, control } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/articles';
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorHtml, setEditorHtml] = useState('');

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddArticle = async (data) => {
    console.log(data);
    setIsLoading(true);

    const image = data.image[0];
    const formData = new FormData();
    formData.append('file', image);
    formData.append('folder', 'Articles');
    formData.append('upload_preset', 'nsjnu2023');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/ddng2uach/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary.');
      }

      const imageData = await response.json();
      console.log(imageData);

      const articleInfo = {
        title: data.title,
        photoURL: imageData.secure_url,
        description: editorHtml,
        createdAt: new Date().toISOString(),
      };

      fetch('https://nsjnu-server.vercel.app/articles', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(articleInfo),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });

      await queryClient.invalidateQueries('articles');
      await queryClient.refetchQueries('articles');

      setIsLoading(false);
      setIsModalOpen(false);
      toast.success('New Article Posted Successfully!');
      reset();
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const CustomClipboard = Quill.import('modules/clipboard');

  class MyClipboard extends CustomClipboard {
    convert(html) {
      // Use DOMParser to sanitize HTML
      const doc = new DOMParser().parseFromString(html, 'text/html');
      // Remove all style tags
      Array.from(doc.querySelectorAll('style')).forEach(el => el.remove());
      // Remove all script tags
      Array.from(doc.querySelectorAll('script')).forEach(el => el.remove());
      // Your custom sanitization logic here
      return super.convert(doc.body.innerHTML);
    }
  }

  Quill.register('modules/clipboard', MyClipboard, true);

  const quillModules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div>
      <>
        <input
          type="checkbox"
          id="article-modal"
          className="modal-toggle"
          checked={isModalOpen}
          onChange={handleModalToggle}
        />
        <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
          <div className="modal-box max-w-3xl">
            <label
              htmlFor="article-modal"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              X
            </label>

            <form onSubmit={handleSubmit(handleAddArticle)}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  {...register('title')}
                  placeholder="Title of article"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="file"
                  {...register('image')}
                  placeholder="Submit a photo"
                  accept="image/*"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={editorHtml}
                      onChange={setEditorHtml}
                      modules={quillModules}
                    />
                  )}
                />
              </div>

              <div className="form-control modal-action mt-6">
                <button className="btn btn-primary">
                  {isLoading ? (
                    <span>
                      <AiOutlineLoading className="animate-spin" /> Loading...
                    </span>
                  ) : (
                    'Post'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default ArticleModal;