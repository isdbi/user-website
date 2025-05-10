import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MagicCard } from "@/components/magicui/magic-card";
import { HomeIcon, BuildingIcon, CarIcon, TrendingUpIcon } from "lucide-react"; // Replace with actual imports as needed

const products = [
	{
		id: "building-financing",
		icon: <HomeIcon className="w-6 h-6 text-amber-500" />,
		title: "building-financing",
		description: "Shariah-compliant home purchase and refinancing solutions",
		link: "/building",
	},
	{
		id: "business-financing",
		icon: <BuildingIcon className="w-6 h-6 text-amber-500" />,
		title: "Business Financing",
		description: "Capital and growth funding for your business",
		link: "/business-financing",
	},
	{
		id: "vehicle-leasing",
		icon: <CarIcon className="w-6 h-6 text-amber-500" />,
		title: "Vehicle Leasing",
		description: "Ijarah-based vehicle financing options",
		link: "/vehicle",
	},
	{
		id: "investment-products",
		icon: <TrendingUpIcon className="w-6 h-6 text-amber-500" />,
		title: "Investment Products",
		description: "Profit-sharing investment opportunities",
		link: "/investment-products",
	},
];



export default function HomePage() {
	return (
		<div className="bg-background text-foreground">
			{/* Navigation */}
			<header className="container mx-auto px-4 py-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<div className="mr-12">
							<Image alt="Logo" src="/logo.png" width={100} height={50} />
						</div>
						<nav className="hidden md:flex space-x-8">
							{["Home", "Product", "Resources", "Contact"].map(
								(item) => (
									<Link
										key={item}
										href="#"
										className="text-muted-foreground hover:text-amber-400 transition-colors duration-200"
									>
										{item}
									</Link>
								)
							)}
						</nav>
					</div>
					<div className="flex items-center gap-4">
						<ThemeToggle />
						<Link
							href="#"
							className="bg-amber-200 hover:bg-amber-300 text-gray-800 px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 dark:bg-amber-300 dark:hover:bg-amber-400"
						>
							Get Started
						</Link>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="container mx-auto px-4 py-16 text-center">
				<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
					<span className="text-foreground">Build </span>
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-300 dark:to-amber-500">
						Shariah-compliant
					</span>
					<br />
					<span className="text-foreground">financial products</span>
				</h1>
				<p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
					Create Islamic financial products in minutes, not months. Our
					AI-powered platform guides you through every step of the process.
				</p>
				<Link
					href="#products"
					className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-800 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
				>
					Explore Products
				</Link>
			</section>

			{/* Products Diagram Section */}
			<section id="products" className="container mx-auto px-4 py-16">
				<h2 className="text-3xl font-bold text-center mb-12 text-foreground">
					Our Financial Products
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.map((product) => (
						<MagicCard
							key={product.id}
							className="rounded-xl shadow-lg p-6 border border-amber-200/20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-[101%]"
							gradientColor="rgba(251, 191, 36, 0.2)"
						>
							<div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
								{product.icon}
							</div>
							<h3 className="text-xl font-bold mb-2 text-foreground">
								{product.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
								{product.description}
							</p>
							<Link
								href={product.link}
								className="block bg-amber-200 hover:bg-amber-300 dark:bg-amber-500/30 dark:hover:bg-amber-500/50 text-center text-gray-800 dark:text-amber-100 px-4 py-3 rounded-full font-medium transition-all duration-300 transform"
							>
								Get Started
							</Link>
						</MagicCard>
					))}
				</div>
			</section>
		</div>
	);
}
