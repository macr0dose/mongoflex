// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import CustomMenu from "./CustomMenu";
// import Modal from "@/components/Modal";

// const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
//   const [imagePreview, setImagePreview] = useState("");

//   // Effect to handle existing image URL
// useEffect(() => {
//   if (post.image && typeof post.image === "string") {
//     setImagePreview(post.image); // Set image preview if it's a URL
//   }
// }, [post.image]);

// const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//     setPost({ ...post, image: file }); // Set the file object, to be uploaded later
//   }
// };

//   return (
//       <Modal>
// <section className="items-center">
//   <h1 className="head_text text-left">
//     <span> {type} Project </span>
//   </h1>
//   <p className="desc text-left max-w-md">
//     {type} and share amazing projects with the world, and let your
//     imagination run wild.
//   </p>

// <form
//   onSubmit={handleSubmit}
//   className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
// >
// <div className="flexStart form_image-container">
//   <label htmlFor="poster" className="flexCenter form_image-label">
//   {!imagePreview && "Choose a poster for your project"}
//     <span className="font-semibold text-base"></span>
//     <input
//       type="file"
//       onChange={handleImageChange}
//       accept="image/*"
//       className="form_image-input"
//     />
//     {imagePreview && (
//       <div className="flex justify-center">
//         <img
//           src={imagePreview}
//           alt="Image Preview"
//           className="sm:p10 object-contain z-20"
//         />
//       </div>
//     )}
//   </label>
// </div>

//   <label>
//     <span className="font-semibold text-base text-gray-700">Title</span>
//     <input
//       value={post.title}
//       onChange={(e) => setPost({ ...post, title: e.target.value })}
//       placeholder="Enter the title..."
//       required
//       className="form_input"
//     />
//   </label>

//   <label>
//     <span className="font-semibold text-base text-gray-700">
//       Description
//     </span>
//     <textarea
//       value={post.description}
//       onChange={(e) => setPost({ ...post, description: e.target.value })}
//       placeholder="Write your description here..."
//       required
//       className="form_textarea"
//     />
//   </label>

//   <label>
//     <span className="font-semibold text-base text-gray-700">
//       Live Site URL
//     </span>
//     <input
//       value={post.liveSiteUrl}
//       onChange={(e) => setPost({ ...post, liveSiteUrl: e.target.value })}
//       placeholder="https://example.com"
//       className="form_input"
//     />
//   </label>

//   <label>
//     <span className="font-semibold text-base text-gray-700">
//       GitHub URL
//     </span>
//     <input
//       value={post.githubUrl}
//       onChange={(e) => setPost({ ...post, githubUrl: e.target.value })}
//       placeholder="https://github.com/example"
//       className="form_input"
//     />
//   </label>

//   <label>
//     <CustomMenu>
//       <span className="font-semibold text-base text-gray-700">
//         Category
//       </span>

//       <input
//         value={post.category}
//         onChange={(e) => setPost({ ...post, category: e.target.value })}
//         placeholder="Category"
//         required
//         className="form_input"
//       />
//     </CustomMenu>
//   </label>
//   <button
//     type="submit"
//     disabled={submitting}
//     className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
//   >
//     {submitting ? `${type}...` : type}
//   </button>
//   <Link href="/">
//     <button className="text-gray-500 text-small">Cancel</button>
//   </Link>
// </form>

// </section>
//       </Modal>
//   );
// };

// export default Form;

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
        <p className="text-5xl font-bold text-left">
          <span> {type} Project </span>
        </p>
        {/* <p className="desc text-left max-w-md">
          {type} and share amazing projects with the world
        </p> */}
      </Dialog.Title>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7"
      >
        <div className="flexCenter form_image-container">
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
              <div className="">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="h-[300px] w-[300px] object-contain z-20"
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
          <span className="font-semibold text-base text-gray-700">
            Category
          </span>
          <CustomMenu state={post.category} setState={handleCategoryChange} />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
        >
          {submitting ? `${type}...` : type}
        </button>
        <Link href="/">
          <button className="text-gray-500  text-small">Cancel</button>
        </Link>
      </form>
    </Modal>
  );
};

export default Form;
