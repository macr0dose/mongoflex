import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('createdBy'); // Assuming 'createdBy' is the correct reference
        if (!prompt) return new Response('Prompt not found', { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch prompt', { status: 500 });
    }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { title, description, image, liveSiteUrl, githubUrl, category } = await request.json(); // Updated to match schema fields

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) return new Response('Prompt not found', { status: 404 });

        // Update fields
        existingPrompt.title = title;
        existingPrompt.description = description;
        existingPrompt.image = image;
        existingPrompt.liveSiteUrl = liveSiteUrl;
        existingPrompt.githubUrl = githubUrl;
        existingPrompt.category = category;

        await existingPrompt.save();

        return new Response("Successfully updated the prompt", { status: 200 });
    } catch(error) {
        return new Response('Failed to update prompt', { status: 500 });
    }
};

// DELETE (remove)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response('Prompt deleted successfully', { status: 200 });
    } catch (error) {
        return new Response('Failed to delete prompt', { status: 500 });
    }
};
