import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Landing/navbar";
import { FloatingNavDemo } from "@/components/Landing/floating-nav-demo";
import { HeroSection } from "@/components/Landing/hero-section";
import { TakeActionSection } from "@/components/Landing/take-action-section";
import { AchievementsSection } from "@/components/Landing/achievements-section";
import { HowItWorksSection } from "@/components/Landing/how-it-works-section";
import { AIAssistantSection } from "@/components/Landing/ai-assistant-section";
import { CTABanner } from "@/components/Landing/cta-banner";
import { Footer } from "@/components/Landing/footer";

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

	<Link href="/auth/signin">
		<Button
			size="lg"
			className="bg-green-600 hover:bg-green-700 text-white shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
		>
			Get Started
		</Button>
	</Link>;

	return (
		<main className="min-h-screen bg-gray-900 overflow-x-hidden">
			<Navbar />
			<FloatingNavDemo />
			<div id="home">
				<HeroSection />
			</div>
			{/* <div id="features">
				<TakeActionSection />
			</div> */}
			<AchievementsSection />
			<div id="how-it-works">
				<HowItWorksSection />
			</div>
			<AIAssistantSection />
			<CTABanner />
			<div id="contact">
				<Footer />
			</div>
		</main>
	);
}
