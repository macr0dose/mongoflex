"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ProjectCard = ({ post, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

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

  const isOwnPost = session?.user?.id === post.creator._id;

  return (
    <div className="project_card">
      {/* Post Image from Cloudinary */}
      {post.image && (
        <div
          className="mt-3 cursor-pointer image-container"
          onClick={handleProfileClick}
        >
          <Image
            src={post.image}
            alt={post.title}
            width={350}
            height={300}
            className="rounded-lg"
          />
        </div>
      )}

      {/* User Avatar and Info */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-3 items-center group">
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
            <Image src="/assets/images/heart.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">{randomLikes}</p>
            <Image src="/assets/images/eye.svg" width={13} height={12} alt="heart" />
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
