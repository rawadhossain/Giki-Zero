import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { z } from "zod";

const credentialsSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

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

				const parsedCredentials = credentialsSchema.safeParse(credentials);

				if (!parsedCredentials.success) {
					console.error("Invalid credentials format");
					return null;
				}

				const { email, password } = parsedCredentials.data;

				const user = await prisma.user.findUnique({
					where: { email },
				});

				if (!user || !user.password) {
					console.log("User not found or no password set");
					return null;
				}

				const isPasswordValid = await compare(password, user.password);

				if (!isPasswordValid) {
					console.log("Invalid password");
					return null;
				}

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
	},
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (user) {
				token.id = user.id;
				token.onboardingCompleted = user.onboardingCompleted;
			}

			// Handle session updates (like after onboarding completion)
			if (trigger === "update" && session?.onboardingCompleted !== undefined) {
				token.onboardingCompleted = session.onboardingCompleted;
			}

			// Always fetch fresh onboarding status for consistency
			if (token.id) {
				const dbUser = await prisma.user.findUnique({
					where: { id: token.id as string },
					select: { onboardingCompleted: true },
				});
				if (dbUser) {
					token.onboardingCompleted = dbUser.onboardingCompleted;
				}
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
	},
	pages: {
		signIn: "/auth/signin",
	},
	debug: process.env.NODE_ENV === "development",
};
