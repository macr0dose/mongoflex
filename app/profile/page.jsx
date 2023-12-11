"use client"; // Ensures the component is treated as a Client Component

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Corrected import path

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPrompts, setMyPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();

      setMyPrompts(data);
    };

    if (session?.user.id) fetchPrompts();
  }, [session?.user.id]);

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPrompts = myPrompts.filter((item) => item._id !== prompt._id);
        setMyPrompts(filteredPrompts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPrompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
