"use client";

import type React from "react";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Leaf, Mail, ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result?.ok) {
				const session = await getSession();
				router.push("/onboarding");
			}
		} catch (error) {
			console.error("Sign in error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		try {
			await signIn("google", { callbackUrl: "/onboarding" });
		} catch (error) {
			console.error("Google sign in error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
			{/* Mobile-friendly header */}
			<div className="flex items-center justify-between p-4 sm:p-6">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => router.back()}
					className="touch-target"
				>
					<ArrowLeft className="h-5 w-5" />
				</Button>
				{/* <div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
						<Leaf className="h-4 w-4" />
					</div>
					<span className="text-lg font-semibold">Giki Zero</span>
				</div> */}
				<div className="w-10" /> {/* Spacer for centering */}
			</div>

			{/* Main content */}
			<div className="flex-1 flex items-center justify-center p-4">
				<Card className="w-full max-w-md mx-auto">
					<CardHeader className="space-y-1 text-center pb-4">
						<div className="flex items-center justify-center mb-4">
							<div className="flex h-12 w-12 items-center justify-center rounded-lg">
								<Leaf className="h-8 w-8" />
							</div>
							<span className="text-2xl font-bold">Giki Zero</span>
						</div>
						<CardTitle className="text-2xl">Welcome Back</CardTitle>
						<CardDescription>
							Sign in to continue tracking your carbon footprint
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Button
							variant="outline"
							className="w-full bg-transparent touch-target"
							onClick={handleGoogleSignIn}
							disabled={isLoading}
						>
							<FcGoogle className="mr-2 h-4 w-4" />
							Continue with Google
						</Button>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="w-full" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Or continue with email
								</span>
							</div>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="touch-target"
									autoComplete="email"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="touch-target"
									autoComplete="current-password"
								/>
							</div>
							<Button
								type="submit"
								className="w-full touch-target"
								disabled={isLoading}
							>
								<Mail className="mr-2 h-4 w-4" />
								{isLoading ? "Signing in..." : "Sign in"}
							</Button>
						</form>
					</CardContent>
					<CardFooter>
						<p className="text-center text-sm text-muted-foreground w-full">
							Don't have an account?{" "}
							<Link
								href="/auth/signup"
								className="text-green-600 hover:underline font-medium"
							>
								Sign up
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
