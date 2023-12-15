import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req) => {
  try {
    await connectToDB();
    const body = await req.json();
    console.log('Received data:', body);
    
    const { creator, title, description, image, liveSiteUrl, githubUrl, category } = body;

    const newPrompt = new Prompt({
      creator,
      title,
      description,
      image, 
      liveSiteUrl,
      githubUrl,
      category,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/prompt/new:', error);
    return new Response(JSON.stringify({ error: "Failed to create new prompt", details: error.message }), { status: 500 });
  }
};
