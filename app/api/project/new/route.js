import { connectToDB } from "@utils/database";
import Project from "@models/project";

export const POST = async (req) => {
  try {
    await connectToDB();
    const body = await req.json();
    // console.log('Received data:', body);

    const {
      creator,
      title,
      description,
      image,
      liveSiteUrl,
      githubUrl,
      category,
    } = body;

    const newProject = new Project({
      creator,
      title,
      description,
      image,
      liveSiteUrl,
      githubUrl,
      category,
    });

    await newProject.save();
    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/project/new:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create new project",
        details: error.message,
      }),
      { status: 500 }
    );
  }
};
