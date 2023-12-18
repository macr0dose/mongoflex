"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  // Determine if the currently logged-in user is the profile owner
  const isProfileOwner = session?.user?.id === params?.id;

  return (
    <Profile
      name={userName}
      data={userPosts}
      showHireMeButton={!isProfileOwner}
    />
  );
};

export default UserProfile;
