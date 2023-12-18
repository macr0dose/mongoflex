import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import Modal from "./Modal"; //
import CustomMenu from "./CustomMenu";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState("");

  const onDismiss = () => {
    setIsOpen(false);
    router.push("/");
  };

  useEffect(() => {
    // Effect for handling 'edit' type
    if (type === "edit") {
      setIsOpen(true);
    }
    // Effect for handling image preview
    if (post.image && typeof post.image === "string") {
      setImagePreview(post.image);
    }
  }, [type, post.image]); //

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setPost({ ...post, image: file });
    }
  };

  const handleCategoryChange = (category) => {
    setPost({ ...post, category });
  };

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <Dialog.Title as="h1" className="">
        <p className="text-3xl font-bold text-left">
          <span> {type} Project </span>
        </p>
        {/* <p className="desc text-left max-w-md">
          {type} and share amazing projects with the world
        </p> */}
      </Dialog.Title>
      <form
        onSubmit={handleSubmit}
        className="mt-5 w-full max-w-2xl flex flex-col gap-5"
      >
        <div className="flexCenter image-container">
          <label htmlFor="poster" className="flexCenter form_image-label">
            {!imagePreview && "Choose an image for your project"}
            <span className="font-semibold text-base"></span>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="form_image-input"
            />
            {imagePreview && (
              <div className="form_image-label overflow-hidden p-2">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-full h-full"
                />
              </div>
            )}
          </label>
        </div>

        <label>
          <span className="font-semibold text-base text-gray-700">Title</span>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Enter the title..."
            required
            className="form_input"
          />
        </label>

        <label>
          <span className="font-semibold text-base text-gray-700">
            Description
          </span>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            placeholder="Write your description here..."
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-semibold text-base text-gray-700">
            Live Site URL
          </span>
          <input
            value={post.liveSiteUrl}
            onChange={(e) => setPost({ ...post, liveSiteUrl: e.target.value })}
            placeholder="https://example.com"
            className="form_input"
          />
        </label>

        <label>
          <span className="font-semibold text-base text-gray-700">
            GitHub URL
          </span>
          <input
            value={post.githubUrl}
            onChange={(e) => setPost({ ...post, githubUrl: e.target.value })}
            placeholder="https://github.com/example"
            className="form_input"
          />
        </label>

        <label>
          <span className="font-semibold text-base text-gray-700 ">
            Category
          </span>
          <CustomMenu state={post.category} setState={handleCategoryChange} />
        </label>
        <div className="flex justify-end gap-2">
          <Link href="/">
            <div className="px-5 py-1.5 text-sm bg-gray-300 rounded-full text-black">
              Cancel
            </div>
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-purple-500 rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Form;
