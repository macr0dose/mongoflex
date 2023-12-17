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
          const response = await fetch(`/api/project/${promptId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch project details");
          }
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error("Error fetching project details:", error);
        }
      }
    };

    getPromptDetails();
  }, [promptId]);

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
        setPost({ ...post, image: data.secure_url }); // Update post state with image URL
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
      const imageData = new FormData();
      imageData.append("file", post.image);
      imageData.append("upload_preset", `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`, {
          method: "POST",
          body: imageData,
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Failed to upload image to Cloudinary:", errorData);
          throw new Error(errorData);
        }

        const responseData = await response.json();
        const imageUrl = responseData.secure_url;

        sendUpdateRequest(imageUrl);
      } catch (error) {
        console.error("Error in uploading image to Cloudinary:", error);
        setIsSubmitting(false);
      }
    } else {
      sendUpdateRequest(post.image);
    }
  };
  

  const sendUpdateRequest = async (updatedImage) => {
    try {
      const response = await fetch(`/api/project/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...post,
          image: updatedImage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Failed to update project:", errorData);
        throw new Error(errorData);
      }

      const responseData = response.headers.get("content-length") > 0 ? await response.json() : null;
      console.log("Update successful:",);

      router.push("/");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in updating project:", error);
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
