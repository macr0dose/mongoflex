import { connectToDB } from "@utils/database";
import Project from "@models/project";

//GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const project = await Project.findById(params.id).populate("creator");
    if (!project) return new Response("Project not found", { status: 404 });

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all projects", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();
    const { title, description, image, liveSiteUrl, githubUrl, category } =
      await request.json();

    const existingPrompt = await Project.findById(params.id);
    if (!existingPrompt) {
      return new Response("Project not found", { status: 404 });
    }
    existingPrompt.title = title || existingPrompt.title;
    existingPrompt.description = description || existingPrompt.description;
    existingPrompt.image = image || existingPrompt.image;
    existingPrompt.liveSiteUrl = liveSiteUrl || existingPrompt.liveSiteUrl;
    existingPrompt.githubUrl = githubUrl || existingPrompt.githubUrl;
    existingPrompt.category = category || existingPrompt.category;

    await existingPrompt.save();

    return new Response(
      JSON.stringify({ message: "Successfully updated the project" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update project" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

// DELETE (remove)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Project.findByIdAndRemove(params.id);

    return new Response("Project deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete project", { status: 500 });
  }
};
