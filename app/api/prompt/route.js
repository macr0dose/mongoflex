import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const revalidate = 0;

export const GET = async () => {
    try {
        await connectToDB();

        // Fetch all prompts and populate the 'createdBy' field
        const prompts = await Prompt.find().populate('creator',);

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.error("Error in GET /api/prompt:", error); // Log the error for debugging
        return new Response(`Failed to fetch all prompts: ${error.message}`, { status: 500 });
    }
};
