"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
    creator: session?.user.id || "",
  });

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Failed to upload image", error);
      throw error; 
    }
  };

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // If post.image is a File object, upload it and get the URL
      if (post.image && typeof post.image === 'object') {
        const imageUrl = await uploadImage(post.image);
        post.image = imageUrl; // Update image in the post object with the URL
      }

      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.log("Error response:", await response.json());
      }
    } catch (error) {
      console.error("Error creating prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />;
};

export default CreatePrompt;
