import Project from "@models/project";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const projects = await Project.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch projects created by user", {
      status: 500,
    });
  }
};
