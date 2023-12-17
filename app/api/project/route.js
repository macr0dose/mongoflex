import { connectToDB } from '@utils/database';
import Project from '@models/project';

export const revalidate = 0;

export const GET = async () => {
    try {
        await connectToDB();

        // Fetch all projects and populate the 'createdBy' field
        const projects = await Project.find().populate('creator',);

        return new Response(JSON.stringify(projects), { status: 200 });
    } catch (error) {
        console.error("Error in GET /api/project:", error); // Log the error for debugging
        return new Response(`Failed to fetch all projects: ${error.message}`, { status: 500 });
    }
};
