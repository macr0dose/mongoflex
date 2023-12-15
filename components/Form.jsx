import React, { useState, useEffect } from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [imagePreview, setImagePreview] = useState("");

  // Effect to handle existing image URL
  useEffect(() => {
    if (post.image && typeof post.image === 'string') {
      setImagePreview(post.image); // Set image preview if it's a URL
    }
  }, [post.image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setPost({ ...post, image: file }); // Set the file object, to be uploaded later
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {type} Prompt </span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-semibold text-base text-gray-700">Image</span>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="form_input"
          />
          {imagePreview && (
            <div className="flex justify-center">
              <img src={imagePreview} alt="Image Preview" className="max-h-40 object-contain" />
            </div>
          )}
        </label>

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
          <span className="font-semibold text-base text-gray-700">
            Category
          </span>
          <input
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
            placeholder="Category"
            required
            className="form_input"
          />
        </label>
        <Link href="/">
          <button className="text-gray-500 text-small">Cancel</button>
        </Link>
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
        >
          {submitting ? `${type}...` : type}
        </button>
      </form>
    </section>
  );
};

export default Form;