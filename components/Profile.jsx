import { useState, useEffect } from 'react';
import ProjectCard from "./ProjectCard";
import { useSession } from 'next-auth/react';

const Profile = ({ name, desc, data, userId, handleEdit, handleDelete }) => {
  const [bio, setBio] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isFetchingBio, setIsFetchingBio] = useState(true);

  const { data: session } = useSession();

  // Function to fetch user bio
  const fetchBio = async () => {
    try {
      console.log("Fetching bio for User ID:", userId);
      const response = await fetch(`/api/users/${userId}/bio`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Error fetching bio: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setBio(data.bio);
      setIsFetchingBio(false);
    } catch (error) {
      console.error("Error fetching bio:", error);
      setIsFetchingBio(false);
    }
  };

  // Function to update user bio
  const handleBioUpdate = async (newBio) => {
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
    try {
      const response = await fetch(`/api/users/${userId}/bio`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio: newBio }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update bio: ${response.statusText}`);
      }
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update bio", error);
      alert("Failed to edit bio");
    }
  };

  // Fetch bio when component mounts
  useEffect(() => {
    if (userId) {
      fetchBio();
    }
  }, [userId]);

  const saveBio = async () => {
    await handleBioUpdate(bio);
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="purple_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {editMode ? (
        <>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          <button onClick={saveBio}>Save Bio</button>
        </>
      ) : (
        <>
          <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
            {isFetchingBio ? "Loading..." : (bio || "Create your bio")}
          </p>
          {/* Check if the session user's ID matches the profile's user ID */}
          {session?.user?.id === userId && (
            <button onClick={() => setEditMode(true)}>Edit Bio</button>
          )}
        </>
      )}

      <div className="project_layout">
        {data.map((post) => (
          <ProjectCard
            key={post._id}
            post={post}
            handleEdit={handleEdit ? () => handleEdit(post) : undefined}
            handleDelete={handleDelete ? () => handleDelete(post) : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;