"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({
    title: "",
    description: "",
    image: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
    creator: "",
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (promptId) {
        try {
          const response = await fetch(`/api/prompt/${promptId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch prompt details");
          }
          const data = await response.json();
          setPost({
            title: data.title,
            description: data.description,
            image: data.image,
            liveSiteUrl: data.liveSiteUrl,
            githubUrl: data.githubUrl,
            category: data.category,
          });
        } catch (error) {
          console.error("Error fetching prompt details:", error);
        }
      }
    };

    getPromptDetails();
  }, [promptId]);

  const handleImageChange = (newImage) => {
    setPost({ ...post, image: newImage });
    setImageChanged(true);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", post.image);
    formData.append("upload_preset", "esal5vff");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (data.secure_url) {
        return data.secure_url, setPost({ ...post, image: data.secure_url }); // Update post state with image URL
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsSubmitting(false); // Stop submitting if the image upload fails
    }
  };

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (post.image && typeof post.image === "object") {
      await uploadImage(); // Upload image if it's a file object
    }
  
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...post,
          image: post.image, // Replace imageUrl with post.image
        }),
      });
  
      // Check if the response is ok
      if (!response.ok) {
        // Handle non-200 responses
        const errorData = await response.text();
        console.error("Failed to update prompt:", errorData);
        throw new Error(errorData);
      }
  
      // Optionally parse JSON only if response is not empty
      const responseData = response.headers.get("content-length") > 0 ? await response.json() : null;
      console.log("Update successful:", responseData);
  
      router.push("/");
    } catch (error) {
      console.error("Error in updating prompt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
