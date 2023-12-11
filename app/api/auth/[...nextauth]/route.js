import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      // Use the user ID from the database, not just the email
      if (user && user._id) {
        session.user.id = user._id.toString();
      }
      return session;
    },
    async signIn({ account, profile }) {
      try {
        await connectToDB();
        const existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          await User.create({
            name: profile.name, // Assuming 'name' is the correct field
            email: profile.email,
            avatarUrl: profile.picture, // Assuming 'avatarUrl' is the correct field
            // Set default values for other fields
            description: '',
            githubUrl: '',
            linkedInUrl: '',
            // prompts array will be empty initially
            prompts: []
          });
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
