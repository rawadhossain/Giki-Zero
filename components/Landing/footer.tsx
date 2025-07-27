"use client";

import { Github, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
	const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const navLinks = [
		{ name: "Home", href: "#" },
		{ name: "Features", href: "#" },
		{ name: "Dashboard", href: "#" },
		{ name: "Privacy", href: "#" },
	];

	const socialLinks = [
		{ icon: Github, href: "github.com/rawadhossain", color: "from-gray-600 to-gray-800" },
	];

	return (
		<footer className="bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
			{/* Subtle Wave Background */}
			<div className="absolute inset-0 opacity-5">
				<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
					<defs>
						<linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="#46B64A" />
							<stop offset="50%" stopColor="#54D0FF" />
							<stop offset="100%" stopColor="#A3F7B5" />
						</linearGradient>
					</defs>
					<path
						d={`M0,30 Q${25 + Math.sin(mousePosition.x * 0.01) * 5},${
							20 + Math.cos(mousePosition.y * 0.01) * 3
						} 50,35 T100,30 V100 H0 Z`}
						fill="url(#footerGradient)"
						className="transition-all duration-500 ease-out"
					/>
				</svg>
			</div>

			<div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
				{/* Divider */}
				<div className="border-t border-gray-700 pt-8">
					<div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-8 md:space-y-0">
						{/* Copyright */}
						<div className="text-gray-400 text-md md:mr-4">
							{" "}
							{/* Added md:mr-4 for a small margin between text and icons on medium screens and up */}
							© 2025 Giki Zero. Built by Rawad Hossain.{" "}
							{/* <span className="text-green-400">💚</span> for a sustainable future. */}
						</div>

						{/* Social Links */}
						<div className="flex space-x-4">
							{socialLinks.map((social, index) => (
								<a
									key={index}
									href={social.href}
									className="group relative"
									onMouseEnter={() => setHoveredSocial(index)}
									onMouseLeave={() => setHoveredSocial(null)}
								>
									<div
										className={`p-3 rounded-xl bg-gradient-to-br ${social.color} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
									>
										<social.icon className="w-5 h-5 text-white" />
									</div>

									{/* Glow Effect */}
									{hoveredSocial === index && (
										<div
											className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-xl blur-lg opacity-50 animate-pulse -z-10`}
										/>
									)}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
