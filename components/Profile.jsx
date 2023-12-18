import Link from "next/link";
import Button from "./Button";
import ProjectCard from "./ProjectCard";

const Profile = ({
  name,
  desc,
  data,
  showHireMeButton,
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="purple_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="flex">
        <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
          Freelance Full-stack Developer 👋
        </p>

        {showHireMeButton && (
          <div className="flexCenter mt-8 ">
            <Link href={`mailto:${name}@example.com`}>
              <Button title="Hire Me" leftIcon="/assets/images/email.svg" />
            </Link>
          </div>
        )}
      </div>

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

//make a seperate edit page so the profile can display all the user info and contact buttons
