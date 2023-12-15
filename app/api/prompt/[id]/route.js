import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();
    const { title, description, image, liveSiteUrl, githubUrl, category } =
      await request.json();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.title = title || existingPrompt.title;
    existingPrompt.description = description || existingPrompt.description;
    existingPrompt.image = image || existingPrompt.image;
    existingPrompt.liveSiteUrl = liveSiteUrl || existingPrompt.liveSiteUrl;
    existingPrompt.githubUrl = githubUrl || existingPrompt.githubUrl;
    existingPrompt.category = category || existingPrompt.category;

    await existingPrompt.save();

    return new Response(
      JSON.stringify({ message: "Successfully updated the prompt" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating prompt:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update prompt" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

// DELETE (remove)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
