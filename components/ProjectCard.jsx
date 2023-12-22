"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProjectDetails from "@app/project/[id]/page";
import Modal from "./Modal";

const ProjectCard = ({ post, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const [showModal, setShowModal] = useState(false); 

  // State for random likes and views
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");

  useEffect(() => {
    // Generate random likes and views
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k");
  }, [post.id]);

  const handleProfileClick = () => {
    if (post.creator._id === session?.user?.id) {
      router.push("/profile");
    } else {
      router.push(`/profile/${post.creator._id}?name=${post.creator.name}`);
    }
  };
  
  const handleImageClick = () => {
    setShowModal(true); // Open the modal when the image is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  const isOwnPost = session?.user?.id === post.creator._id;

  return (
    <div className="project_card group">
      {showModal && (
        <Modal isOpen={showModal} onDismiss={closeModal}>
          <ProjectDetails projectId={post._id} />
        </Modal>
      )}

      {/* Post Image from Cloudinary */}
      {post.image && (
        <div className="mt-3 cursor-pointer relative image-container" onClick={handleImageClick}>
          <Image src={post.image} alt={post.title} width={350} height={250} className="rounded-lg " format="auto" />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-lg bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
            <p className="hidden group-hover:block text-white text-lg ">
              {post.title}
            </p>
          </div>
        </div>
      )}

      {/* User Avatar and Info */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-3 items-center">
          <div className="cursor-pointer" onClick={handleProfileClick}>
            <Image
              src={post.creator.avatarUrl}
              alt="user_image"
              width={30}
              height={30}
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-sm">{post.creator.name}</h3>
        </div>

        <div className="flexCenter gap-2">
          <Image
            src="/assets/images/heart.svg"
            width={13}
            height={12}
            alt="heart"
          />
          <p className="text-sm">{randomLikes}</p>
          <Image
            src="/assets/images/eye.svg"
            width={13}
            height={12}
            alt="heart"
          />
          <p className="text-sm">{randomViews}</p>
        </div>
      </div>

      {/* Edit and Delete Options for User's Own Posts */}
      {isOwnPost && pathName.includes("/profile") && (
        <div className="mt-3 flex-center gap-4 border-t border-gray-100 p-3 ">
          <p
            className="text-lg green_gradient cursor-pointer border-r border-black pr-4"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="text-lg  text-red-500 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;

//add contact form
