import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Profile = ({ name, desc, data, userId, handleEdit, handleDelete }) => {
  const [bio, setBio] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isFetchingBio, setIsFetchingBio] = useState(true);
  const textareaRef = useRef(null); // Reference for the textarea

  const { data: session } = useSession();

  // Function to fetch user bio
  const fetchBio = async () => {
    try {
      // console.log("Fetching bio for User ID:", userId);
      const response = await fetch(`/api/users/${userId}/bio`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(
          `Error fetching bio: ${response.status} ${response.statusText}`
        );
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
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
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

  // Position cursor at the end of the text
  const positionCursorToEnd = () => {
    const textLength = textareaRef.current.value.length;
    textareaRef.current.setSelectionRange(textLength, textLength);
  };

  // Fetch bio when component mounts
  useEffect(() => {
    if (userId) {
      fetchBio();
    }
  }, [userId]);

  useEffect(() => {
    if (editMode) {
      textareaRef.current?.focus(); // Autofocus the textarea in edit mode
      positionCursorToEnd();
    }
  }, [editMode]);

  const saveBio = async () => {
    await handleBioUpdate(bio);
  };

  return (
    <section className="feed">
      <div className="flex justify-between w-full">
        <h1 className="head_text">
          <span className="purple_gradient">{name} Profile</span>
        </h1>

        {/* Check if the session user's ID matches the profile's user ID */}
        {session?.user?.id === userId && (
          <div>
            {editMode ? (
              <div className="flex gap-2 mt-6">
                <button
                  className="bg-green-500 rounded-xl text-sm text-white font-medium p-2"
                  onClick={saveBio}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 rounded-xl text-xs text-white p-2"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="bg-purple-300 rounded-xl text-sm text-white font-medium p-2 flex mt-6"
                onClick={() => setEditMode(true)}
              >
                <Image
                  src="/assets/images/pencil.svg"
                  width={20}
                  height={20}
                  alt="Edit"
                />
              </button>
            )}
          </div>
        )}
      </div>
      <p className="text-lg w-full ">{desc}</p>

      {editMode ? (
        <textarea
          ref={textareaRef}
          className="w-full text-lg font-bold border border-slate-300 rounded-xl p-2 focus:border-purple-500"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      ) : (
        <p className="md:text-3xl text-2xl font-extrabold md:mt-5 mt-4 w-full">
          {isFetchingBio ? "Loading..." : bio || "Create your bio"}
        </p>
      )}

      <div className="project_layout mt-6 project_card">
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

