"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);
  const [userBio, setUserBio] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPostsAndBio = async () => {
      try {
        // Fetch posts
        const postsResponse = await fetch(`/api/users/${params?.id}/posts`);
        const postsData = await postsResponse.json();
        setUserPosts(postsData);

        // Fetch bio
        const bioResponse = await fetch(`/api/users/${params?.id}/bio`);
        const bioData = await bioResponse.json();
        setUserBio(bioData.bio);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (params?.id) fetchPostsAndBio();
  }, [params.id]);

  const isProfileOwner = session?.user?.id === params?.id;

  return (
    <Profile
      name={userName}
      bio={userBio}
      data={userPosts}
      showHireMeButton={!isProfileOwner}
      userId={params?.id}
    />
  );
};

export default UserProfile;