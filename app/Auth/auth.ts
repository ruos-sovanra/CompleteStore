import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "@auth/core/providers/credentials";
export const { handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				// let user = {
				//   email: credentials.email,
				//   name: 'John Doe',
				//   image: 'https://via.placeholder.com/150',
				// };
				console.log('Credentials:', credentials);
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST}login/`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(credentials),
					}
				);
				// if (!response.ok) {
				//   // No user found, so this is their first attempt to login
				//   // meaning this is also the place you could do registration
				//   const error = await response.json();
				//   throw new Error(error);
				// }
				// console.log('User:', user);
				const data = await response.json();
				console.log('data:', data);
				// console.log('Data:', data);
				const user = data?.user || null;
				return {
					...user,
					name: user?.first_name + ' ' + user?.last_name,
					image: user?.username,
				};
			},
		}),
		GithubProvider({
			clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
		}),


	],
})

