import React from "react";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";

import { cn } from "@/lib/utils";

interface WrapButtonProps {
	className?: string;
	children: React.ReactNode;
	href?: string;
}

export const WrapButton: React.FC<WrapButtonProps> = ({ className, children, href }) => {
	return (
		<div className="flex items-center justify-center">
			{href ? (
				<Link href={href}>
					<div
						className={cn(
							"group cursor-pointer border group border-[#3B3A3A] bg-[#151515] gap-3 h-[72px] flex items-center p-[11px] rounded-full",
							className
						)}
					>
						<div className="border border-[#3B3A3A] bg-[#208e41] h-[50px] rounded-full flex items-center justify-center text-white px-6">
							{" "}
							{/* Added px-6 for internal padding */}
							{children} {/* Children (Sprout and text) will be rendered here */}
						</div>
						<div className="text-[#3b3a3a] group-hover:ml-3 ease-in-out transition-all size-[30px] flex items-center justify-center rounded-full border-2 border-[#ced2cc]">
							<ArrowRight
								size={20}
								className="group-hover:rotate-45 ease-in-out transition-all"
							/>
						</div>
					</div>
				</Link>
			) : (
				<div
					className={cn(
						"group cursor-pointer border group border-[#3B3A3A] bg-[#151515] gap-3 h-[72px] flex items-center p-[14px] rounded-full",
						className
					)}
				>
					<div className="border border-[#3B3A3A] bg-[#208e41] h-[50px] rounded-full flex items-center justify-center text-white px-6">
						{" "}
						{/* Added px-6 for internal padding */}
						{/* Removed Globe icon here */}
						<p className="font-medium tracking-tight">
							{children ? children : "Get Started"}
						</p>
					</div>
					<div className="text-[#ced2cc] group-hover:ml-3 ease-in-out transition-all size-[30px] flex items-center justify-center rounded-full border-2 border-[#3b3a3a]">
						<ArrowRight
							size={20}
							className="group-hover:rotate-45 ease-in-out transition-all color"
						/>
					</div>
				</div>
			)}
		</div>
	);
};
