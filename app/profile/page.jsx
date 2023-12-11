"use client"
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'; // Fixed import path

import Form from '@components/Form';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [project, setProject] = useState({
    title: '',
    description: '',
    image: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: ''
  });

  const createProject = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/project/new', { // Updated API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...project,
          createdBy: session?.user.id  // Assuming session.user.id is the ID of the creator
        })
      });

      if (response.ok) {
        router.push('/'); // Redirect after successful creation
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create Project"
      post={project}
      setPost={setProject}
      submitting={submitting}
      handleSubmit={createProject}
    />
  );
};

export default CreatePrompt;
