"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
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
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const isOwnPost = session?.user?.id === post.creator._id;

  return (
    <div className="project_card group">
      {showModal && (
        <Modal isOpen={showModal} onDismiss={closeModal}>
          <div className="project_details_container">
            <ProjectDetails projectId={post._id} onCloseModal={closeModal} />
          </div>
        </Modal>
      )}

      {/* Get Image from Cloudinary */}
      {post.image && (
        <div
          className="rounded-2xl cursor-pointer relative w-72 h-56"
          onClick={handleImageClick}
        >
          <Image
            src={post.image}
            width={300}
            height={200}
            alt={post.title}
            className="object-contain rounded-2xl w-full h-full"
          />
          <div className="hidden group-hover:flex profile_card-title">
            <p className="w-full">{post.title}</p>
          </div>
        </div>
      )}

      {/* User Avatar and Info */}
      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
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
