import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        // Fetch prompts created by the user with the given ID
        const prompts = await Prompt.find({ createdBy: params.id }).populate('createdBy');

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.error("Error in GET /api/users/[id]/posts:", error); // Log the error for debugging
        return new Response(`Failed to fetch prompts: ${error.message}`, { status: 500 });
    }
};
