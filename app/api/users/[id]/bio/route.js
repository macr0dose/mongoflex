import { connectToDB } from "@utils/database";
import User from "@models/user";


export async function GET(request, { params }) {
    try {
      await connectToDB();
      const { id } = params;
  
      const user = await User.findById(id, 'bio');
      if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ bio: user.bio || "Create your bio" }), { status: 200 });
    } catch (error) {
      console.error("Error fetching bio:", error);
      return new Response(JSON.stringify({ message: "Failed to fetch bio" }), { status: 500 });
    }
  }




// This will handle PATCH requests to /api/users/[id]/bio
export const PATCH = async (request, { params }) => {
    try {
        await connectToDB();
        const { bio } = await request.json(); // Get the new bio from the request body
        const { id } = params; // Get the user ID from the URL

        // Find the user by ID and update their bio
        const user = await User.findByIdAndUpdate(id, { bio }, { new: true });
        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Bio updated successfully", user }), { status: 200 });
    } catch (error) {
        console.error("Error updating bio:", error);
        return new Response("Failed to update bio", { status: 500 });
    }
};


