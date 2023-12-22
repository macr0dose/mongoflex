"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const ProjectDetails = ({ projectId }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Fetch project details based on the projectId
    fetch(`/api/project/${projectId}`)
      .then((response) => response.json())
      .then((data) => setProject(data))
      .catch((error) =>
        console.error("Error fetching project details:", error)
      );
  }, [projectId]);

  if (!project) {
    return <p>Loading project info...</p>;
  }

  return (
    <>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex items-start gap-5 w-full max-xs:flex-col pb-8">
          <Image
            src={project.creator.avatarUrl}
            alt="Creator Avatar"
            width={50}
            height={50}
            className="rounded-full mr-3"
          />

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">{project?.title}</p>

            <div className="user-info">
              <div className="flex items-center mb-4">
                <p>{project.creator.name}</p>
                <Image
                  src="/assets/images/dot.svg"
                  width={4}
                  height={4}
                  alt="dot"
                />
                <p className="text-primary-purple font-semibold">
                  {project.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        {project.image && (
          <Image
            src={project.image}
            alt="Project Image"
            width={1064}
            height={798}
            className="rounded-2xl max-w-[840px] max-h-[700px]"
          />
        )}
      </section>

      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">{project?.description}</p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Link
            href={project?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 text-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/assets/images/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={project?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 text-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-20">
        <span className="w-full h-0.5 bg-light-white-200" />
        <div className="min-w-[82px] h-[82px]">
          <Image
            src={project.creator.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </div>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>
    </>
  );
};

export default ProjectDetails;
