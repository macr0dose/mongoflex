"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.name}`);
  };

  return (
    <div className='prompt_card'>
      {/* User Profile and Post Content */}
      <div className='flex gap-3 items-start'>
        {/* User Avatar and Info */}
        <div className='cursor-pointer' onClick={handleProfileClick}>
          <Image
            src={post.creator.avatarUrl}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
        </div>
        <div className='flex-1'>
          <div className='flex flex-col'>
            <h3 className='font-semibold text-gray-900'>
              {post.creator.name}
            </h3>
            <p className='text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>

          {/* Post Image from Cloudinary */}
          {post.image && (
            <div className='mt-3 prompt_image'>
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={300}
                className='rounded-lg'
              />
            </div>
          )}

          <p className='my-4 text-sm text-gray-700'>{post.prompt}</p>
          <p
            className='text-sm blue_gradient cursor-pointer'
            onClick={() => handleTagClick && handleTagClick(post.title)}
          >
            {post.title}
          </p>
        </div>
      </div>

      {/* Edit and Delete Options for User's Own Posts */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;

