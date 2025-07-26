import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user) {
					return null;
				}

				// For demo purposes, we'll skip password verification
				// In production, you'd verify the hashed password
				return {
					id: user.id,
					email: user.email,
					name: user.name,
					image: user.image,
					onboardingCompleted: user.onboardingCompleted,
				};
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (user) {
				token.id = user.id;
				token.onboardingCompleted = user.onboardingCompleted;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.onboardingCompleted = token.onboardingCompleted as boolean;
			}
			return session;
		},
		async signIn({ user, account, profile }) {
			// Ensure user exists in database
			if (account?.provider === "google" && profile) {
				const existingUser = await prisma.user.findUnique({
					where: { email: user.email! },
				});

				if (!existingUser) {
					// Create new user if they don't exist
					await prisma.user.create({
						data: {
							id: user.id,
							email: user.email!,
							name: user.name,
							image: user.image,
							onboardingCompleted: false,
						},
					});
				}
			}
			return true;
		},
	},
	pages: {
		signIn: "/auth/signin",
	},
};
