
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "@auth/core/providers/credentials";
import {registerUser} from "@/app/(authService)/services/ authService";
import {Profile} from "@/libs/difinition";
import {loginUser} from "@/app/(authService)/services/utils";




export const { handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
	providers: [
		// CredentialsProvider({
		// 	name: "Credentials",
		// 	credentials: {
		// 		email: {
		// 			label: "Email",
		// 			type: "email",
		// 		},
		// 		password: { label: "Password", type: "password" },
		// 	},
		// 	async authorize(credentials, req) {
		// 		const resp = await fetch(`${process.env.BASE_URL}user/login/`, {
		// 			method: "POST",
		// 			headers: {
		// 				Accept: "application/json",
		// 				"Content-Type": "application/json",
		// 			},
		// 			body: JSON.stringify({email: credentials.email, password: credentials.password}),
		// 		});
		// 		const res = await resp.json();
		//
		// 		console.log("Data from login:", res);
		//
		// 		// res.accessGitToken = undefined;
		// 		if (resp.ok && res){
		// 			return {
		// 				name: res.refresh_token, email: res.access_token,
		// 			};
		// 		}
		// 		if (!res.ok) {
		// 			throw new Error(JSON.stringify(res));
		// 		}
		// 		return null
		// 	}
		// }),

		// Credentials({
		// 	// You can specify which fields should be submitted, by adding keys to the `credentials` object.
		// 	// e.g. domain, username, password, 2FA token, etc.
		// 	credentials: {
		// 		email: {},
		// 		password: {},
		// 	},
		// 	authorize: async (credentials) => {
		// 		// let user = {
		// 		//   email: credentials.email,
		// 		//   name: 'John Doe',
		// 		//   image: 'https://via.placeholder.com/150',
		// 		// };
		// 		console.log('Credentials:', credentials);
		// 		const response = await fetch(
		// 			`${process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST}login/`,
		// 			{
		// 				method: 'POST',
		// 				headers: {
		// 					'Content-Type': 'application/json',
		// 				},
		// 				body: JSON.stringify({
		// 					email: "vannraruos@gmail.com",
		// 					password: "Qwerty@123",
		//
		// 				}),
		// 			}
		// 		);
		// 		// if (!response.ok) {
		// 		//   // No user found, so this is their first attempt to login
		// 		//   // meaning this is also the place you could do registration
		// 		//   const error = await response.json();
		// 		//   throw new Error(error);
		// 		// }
		// 		// console.log('User:', user);
		// 		const data = await response.json();
		// 		console.log('Data from login:', data);
		// 		console.log('Data refresh:', JSON.stringify(data));
		// 		if (response.ok && data) {
		// 			console.log('Data in respone and data :', data);
		// 			console.log('Data refresh v1:', data?.refresh_token);
		// 			return {
		// 				...data,
		// 				name: data.refresh_token, email: data.access_token,
		// 			}
		//
		// 		}
		//
		// 		// console.log('Data:', data);
		// 		const user = data?.user || null;
		// 		console.log('User:', user);
		// 		return {
		// 			...user,
		// 			name: user?.first_name + ' ' + user?.last_name,
		// 			image: user?.username,
		// 		};
		// 	},
		// }),
		GithubProvider({
			clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
		}),

		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,

		}),


	],

	callbacks: {
		// @ts-ignore
		async signIn({ user, account, profile }: { user: any, account: any, profile: Profile }) {
			let email: string;
			let name: string;

			if (profile) {
				email = profile.email;
				name = profile.name;
			} else if (user) {
				email = user.email;
				name = user.name;
			} else {
				console.error('No profile or user information available');
				return;
			}

			console.log('User log from Auth :', user);
			// Try to register the user
			const password = email + name + process.env.NEXT_PUBLIC_AUTO_PASSWORD;
			const registerResult = await registerUser(email, password);
			console.log('Register result:', registerResult)
			if (registerResult == false) {
				// console.log('User already exists, attempting to log in the user');
				// throw new Error('User already exists');
				// User already exists, log in the user
				const user = await loginUser(email, password);
				console.log('User hfusdahjs:', user);
				return user;
			} else {
				const password = email + name + process.env.NEXT_PUBLIC_AUTO_PASSWORD;
				await registerUser(email, password);
				// New user registered, log in the user
				// const user = await loginUser(email, password);
				// return user;
			}

		}
		// async session({ session, token, user }) {
		// 	console.log('Session:', session);
		// 	console.log('Token:', token.email);
		// 	console.log('User:', user);
		//
		// 	// Send properties to the client, like an access_token and user id from a provider.
		// 	// session.accessToken = token.accessToken
		// 	// session.user.id = token.id
		//
		// 	return session
		// }
	}
})

