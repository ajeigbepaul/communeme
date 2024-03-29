import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import TwitterProvider from "next-auth/providers/twitter"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // TwitterProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   version:"2.0"
    // }),

    // ...add more providers here
  ],
  secret:process.env.JWT_SECRET
};

export default NextAuth(authOptions);
