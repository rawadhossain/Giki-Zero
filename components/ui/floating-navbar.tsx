"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { JSX } from "react/jsx-runtime";

export const FloatingNav = ({
	navItems,
	className,
}: {
	navItems: {
		name: string;
		link: string;
		icon?: JSX.Element;
	}[];
	className?: string;
}) => {
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(false);

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		if (typeof current === "number") {
			const direction = current! - scrollYProgress.getPrevious()!;
			if (scrollYProgress.get() < 0.05) {
				setVisible(false);
			} else {
				if (direction < 0) {
					setVisible(true);
				} else {
					setVisible(false);
				}
			}
		}
	});

	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial={{
					opacity: 1,
					y: -100,
				}}
				animate={{
					y: visible ? 0 : -100,
					opacity: visible ? 1 : 0,
				}}
				transition={{
					duration: 0.3,
					ease: "easeInOut",
				}}
				className={cn(
					"flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-gray-700/50 rounded-full bg-gray-900/80 backdrop-blur-md shadow-2xl shadow-black/20 z-[5000] px-6 py-3 items-center justify-center space-x-6",
					className
				)}
			>
				{/* Logo Section */}
				<div className="flex items-center space-x-2 pr-4 border-r border-gray-700/50">
					<div className="relative w-8 h-8">
						<Image
							src="/images/giki-logo.png"
							alt="Giki Zero Logo"
							fill
							className="object-contain"
						/>
					</div>
					<div className="flex flex-col">
						<span className="text-white font-bold text-sm">Giki Zero</span>
						<span className="text-green-400 text-xs font-medium">
							Carbon Intelligence
						</span>
					</div>
				</div>

				{/* Navigation Items */}
				{navItems.map((navItem: any, idx: number) => (
					<a
						key={`link=${idx}`}
						href={navItem.link}
						className={cn(
							"relative text-gray-300 items-center flex space-x-2 hover:text-green-400 transition-colors duration-300 group"
						)}
					>
						<span className="block sm:hidden">{navItem.icon}</span>
						<span className="hidden sm:block text-sm font-medium">{navItem.name}</span>
						<div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 group-hover:w-full transition-all duration-300" />
					</a>
				))}

				{/* CTA Button */}
				<button className="relative border border-gray-600/50 text-sm font-medium text-white px-6 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 group overflow-hidden">
					<span className="relative z-10">Get Started</span>
					<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
					<span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-green-400 to-transparent h-px" />
				</button>
			</motion.div>
		</AnimatePresence>
	);
};
