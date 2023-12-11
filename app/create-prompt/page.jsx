"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'; // Corrected import path

import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: '',
    description: '',
    image: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('description', post.description);
    // Add image only if it exists
    if (post.image) {
      formData.append('image', post.image);
    }
    formData.append('liveSiteUrl', post.liveSiteUrl);
    formData.append('githubUrl', post.githubUrl);
    formData.append('category', post.category);
    formData.append('createdBy', session?.user.id); // Assuming session.user.id holds the User ID

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: {
          // Do not set Content-Type header for multipart/form-data, it's automatically set by the browser
        },
        body: formData,
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    setPost({ ...post, image: e.target.files[0] });
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      handleImageUpload={handleImageUpload}
    />
  );
};

export default CreatePrompt;
