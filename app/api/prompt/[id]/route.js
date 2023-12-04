import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';
import User from "@models/user";

//GET (read)
export const GET = async (request, { params }) => {
    try {

        await connectToDB();
        const prompts = await Prompt.find().populate({
          path: "creator"
        });

        const response = new Response(JSON.stringify(prompts), {
          status: 200,
        });

        // Add a unique identifier to the URL to force a cache-busting reload
        const url = new URL(request.url);
        url.searchParams.set("t", Date.now());
        response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        response.headers.set("Location", url.toString());

        return response;
        } catch (error) {
            return new Response('Failed to fetch all prompts', { status: 500 })
    }
}

//PATCH
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response('Prompt not found', { status: 404 })

            existingPrompt.prompt = prompt;
            existingPrompt.tag = tag

            await existingPrompt.save();

            return new Response("Successfully updated the Prompts", { status: 200 })
        } catch(error) {
            return new Response('Failed to update prompt', { status:500 })
        }
    };

//DELETE
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response('Prompt deleted successfully', { status: 200 })
    } catch (error) {
        return new Response('Failed to delete prompt', { status: 500 });
    }

    }