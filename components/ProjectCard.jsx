"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const ProjectCard = ({ post, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

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
        <div className="mt-3 cursor-pointer" onClick={handleProfileClick}>
          <Image
            src={post.image}
            alt={post.title}
            width={250}
            height={200}
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {/* User Avatar and Info */}
      <div className="flex gap-3 items-center mt-3 group">
        <div className="cursor-pointer" onClick={handleProfileClick}>
          <Image
            src={post.creator.avatarUrl}
            alt="user_image"
            width={30}
            height={30}
            className="rounded-full object-cover"
          />
        </div>
      </div>
      <h3 className="font-semibold text-sm">{post.creator.name}</h3>

      <p className="my-4 text-sm text-gray-700">{post.project}</p>
      <div className="hidden group-hover:flex profile_card-title">
        <p className="w-full">{post.title}</p>
      </div>
      {/* Edit and Delete Options for User's Own Posts */}
      {isOwnPost && pathName.includes("/profile") && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 p-3 ">
          <p
            className="text-lg green_gradient cursor-pointer border-r border-black pr-4"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="text-lg orange_gradient cursor-pointer"
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
