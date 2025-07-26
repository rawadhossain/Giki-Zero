import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, LineChart, Lightbulb, FileText } from "lucide-react";

export default async function HomePage() {
	const session = await getServerSession(authOptions);

	// If user is authenticated, check their onboarding status
	if (session?.user?.id) {
		try {
			const user = await prisma.user.findUnique({
				where: { id: session.user.id },
				select: { onboardingCompleted: true },
			});

			if (user?.onboardingCompleted) {
				redirect("/dashboard");
			} else {
				redirect("/onboarding");
			}
		} catch (error) {
			console.error("Error checking user status:", error);
			// If there's an error, continue to show the landing page
		}
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-center p-4">
			<div className="space-y-6 max-w-lg mx-auto">
				<div className="flex items-center justify-center gap-4">
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-lg">
						<Leaf className="h-8 w-8" />
					</div>
					<h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
						Giki Zero
					</h1>
				</div>
				<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
					Your personal carbon footprint tracker. Understand your impact, get personalized
					tips, and contribute to a sustainable future.
				</p>
				<div className="flex justify-center gap-4">
					<Link href="/auth/signin">
						<Button
							size="lg"
							className="bg-green-600 hover:bg-green-700 text-white shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
						>
							Get Started
						</Button>
					</Link>
					<Link href="#features">
						<Button
							size="lg"
							variant="outline"
							className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-gray-700 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
						>
							Learn More
						</Button>
					</Link>
				</div>
			</div>

			{/* Placeholder for features section */}
			<section
				id="features"
				className="w-full py-20 bg-gray-50 dark:bg-gray-950 mt-20 rounded-lg shadow-xl"
			>
				<h2 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white">
					Key Features
				</h2>
				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
						<LineChart className="h-12 w-12 text-blue-500 mb-4" />
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							Track Your Footprint
						</h3>
						<p className="text-gray-700 dark:text-gray-300">
							Easily log your daily activities and see their carbon impact.
						</p>
					</div>
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
						<Lightbulb className="h-12 w-12 text-yellow-500 mb-4" />
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							AI-Powered Tips
						</h3>
						<p className="text-gray-700 dark:text-gray-300">
							Receive personalized suggestions for sustainable living.
						</p>
					</div>
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
						<FileText className="h-12 w-12 text-purple-500 mb-4" />
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							Comprehensive Reports
						</h3>
						<p className="text-gray-700 dark:text-gray-300">
							Generate detailed PDF reports of your progress over time.
						</p>
					</div>
				</div>
			</section>

			{/* Add a simple footer */}
			<footer className="w-full py-8 text-gray-700 dark:text-gray-400 text-sm mt-20 border-t border-gray-200 dark:border-gray-700">
				&copy; {new Date().getFullYear()} Giki Zero. All rights reserved.
			</footer>
		</div>
	);
}
