"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const ProjectDetails = ({ projectId }) => {
  const [project, setProject] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`/api/project/${projectId}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (!project) {
    return <p>Loading project info...</p>;
  }

  const {
    creator,
    title,
    description,
    category,
    image,
    githubUrl,
    liveSiteUrl,
  } = project;

  const handleProfileClick = () => {
    const profileUrl =
      project.creator._id === session?.user?.id
        ? "/profile"
        : `/profile/${project.creator._id}?name=${project.creator.name}`;
    router.push(profileUrl);
  };

  const handleCategoryClick = (category) => {
    // Navigate to the main page with the selected category as a query parameter
    router.push(`/?category=${category}`);
  };

  return (
    <>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex items-start gap-5 w-full max-xs:flex-col pb-8">
          <div onClick={handleProfileClick} className="cursor-pointer">
            <Image
              src={creator.avatarUrl}
              alt="Creator Avatar"
              width={50}
              height={50}
              className="rounded-full mr-3"
            />
          </div>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">{title}</p>
            <div className="user-info">
              <div className="flex items-center mb-4 gap-2">
                <p>{creator.name}</p>
                <Image
                  src="/assets/images/dot.svg"
                  width={4}
                  height={4}
                  alt="dot"
                />
                <p className="text-primary-purple font-semibold"                 onClick={() => handleCategoryClick(category)}>{category}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        {image && (
          <Image
            src={image}
            alt="Project Image"
            width={800}
            height={520}
            className="rounded-2xl md:max-w-[800px] md:max-h-[520px] object-cover"
          />
        )}
      </section>

      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">{description}</p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Link
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 text-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline text-lg">Github</span>
          </Link>
            <Image
              src="/assets/images/dot.svg"
              width={4}
              height={4}
              alt="dot"
            />
          <Link
            href={liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 text-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline text-lg">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-20 font-bold text-purple-500">
        <span className="w-full h-0.5 bg-light-white-200" />
        <p>View</p>
        <div
          onClick={handleProfileClick}
          className="cursor-pointer min-w-[82px] h-[82px]"
        >
          <Image
            src={creator.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </div>
        <p>Profile</p>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>
    </>
  );
};

export default ProjectDetails;