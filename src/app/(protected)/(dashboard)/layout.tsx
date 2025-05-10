"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const [productType, setProductType] = useState<string>("murabaha");
	const [isMobile, setIsMobile] = useState(false);
	const [showMobileDock, setShowMobileDock] = useState(false);

	// Extract product type from URL
	useEffect(() => {
		const segments = pathname.split("/");
		if (segments.length > 2) {
			const product = segments[2].split("/")[0];
			setProductType(product);
		}
	}, [pathname]);

	// Check if mobile
	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkIfMobile();
		window.addEventListener("resize", checkIfMobile);
		return () => window.removeEventListener("resize", checkIfMobile);
	}, []);

	// Show mobile dock when scrolling up
	useEffect(() => {
		if (!isMobile) return;

		let lastScrollY = window.scrollY;

		const handleScroll = () => {
			const scrollY = window.scrollY;
			const scrollingUp = scrollY < lastScrollY;

			setShowMobileDock(scrollingUp || scrollY < 10);
			lastScrollY = scrollY;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isMobile]);

	return (
		<div className="flex h-screen bg-muted/30 dark:bg-muted/10">

			<main className="flex-1 overflow-auto">{children}</main>
		</div>
	);
}

