import type React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";
import ChatBot from "@/components/ChatBot/ChatBot";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		redirect("/auth/signin");
	}

	// Check if user has completed onboarding
	try {
		const user = await prisma.user.findUnique({
			where: { id: session.user.id },
			select: { onboardingCompleted: true },
		});

		if (!user?.onboardingCompleted) {
			redirect("/onboarding");
		}
	} catch (error) {
		console.error("Error checking user onboarding status:", error);
		redirect("/auth/signin");
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-3 sm:px-4">
					<SidebarTrigger className="-ml-1 touch-target" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb className="flex-1 min-w-0">
						<BreadcrumbList>
							<BreadcrumbItem className="hidden sm:block">
								<BreadcrumbLink href="/dashboard" className="truncate">
									Giki Zero
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden sm:block" />
							<BreadcrumbItem>
								<BreadcrumbPage className="truncate">Dashboard</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<div className="ml-auto">
						<ThemeToggle />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-3 sm:gap-4 p-3 sm:p-4 pt-0 mobile-scroll shadow-lg">
					{children}
					<ChatBot />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
