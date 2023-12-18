import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from your API or database
    if (session) {
      // Replace with your API call
      fetch(`/api/user/${session.user.id}`)
        .then(response => response.json())
        .then(data => setUser(data));
    }
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div>
        <p>You are not signed in</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  const isOwnProfile = session.user.id === user?.id;

  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
      <section className="flexBetween max-lg:flex-col gap-10 w-full">
        <div className="flex items-start flex-col w-full">
          <Image
            src={user?.avatarUrl}
            width={100}
            height={100}
            className="rounded-full"
            alt="user image"
          />
          <p className="text-4xl font-bold mt-10">{user?.name}</p>
          <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
            {user?.bio}
          </p>
          <p className="text-4xl font-bold mt-10">{user?.name}</p>
        <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
          I’m learning to code NextJS13 apps 👋
        </p>

          <div className="flex mt-8 gap-5 w-full flex-wrap">
            {isOwnProfile ? (
              <Link href="/edit-profile" className="text-black border-2 border-black">
                <Button title="Edit Profile" />
              </Link>
            ) : (
              <>
                <Button title="Follow" leftIcon="/plus-round.svg" bgColor="bg-light-white-400 !w-max" textColor="text-black-100" />
                <Link href={`mailto:${user?.email}`}>
                  <Button title="Hire Me" leftIcon="/email.svg" />
                </Link>
              </>
            )}
          </div>
        </div>

        {user?.projects?.edges?.length > 0 ? (
          <Image
            src={user?.projects?.edges[0]?.node?.image}
            alt="project image"
            width={739}
            height={554}
            className="rounded-xl object-contain"
          />
        ) : (
          <Image
            src="/profile-post.png"
            width={739}
            height={554}
            alt="project image"
            className="rounded-xl"
          />
        )}
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        <p className="w-full text-left text-lg font-semibold">Recent Work</p>
        <div className="profile_projects">
          {user?.projects?.edges?.map(({ node }) => (
            <ProjectCard
              key={node?.id}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={user.name}
              avatarUrl={user.avatarUrl}
              userId={user.id}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;