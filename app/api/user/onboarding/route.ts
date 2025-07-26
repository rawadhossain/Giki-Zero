import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { name, age, location } = await request.json();

		// Validate required fields
		if (!name || !age || !location) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
		}

		const updatedUser = await prisma.user.update({
			where: { id: session.user.id },
			data: {
				name,
				age,
				location,
				onboardingCompleted: true,
			},
		});

		return NextResponse.json({
			user: updatedUser,
			message: "Profile updated successfully",
		});
	} catch (error) {
		console.error("Onboarding error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
