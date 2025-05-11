export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex-1 w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
			{children}
		</main>
	);
}
