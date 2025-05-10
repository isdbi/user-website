"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	CheckCircle,
	Briefcase,
	FileText,
	Globe,
	ArrowRight,
	Clock,
	CheckSquare,
	Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const FinalReview = () => {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{ label: "Shariah Review", icon: CheckCircle, timeEstimate: "24-48 hours" },
		{ label: "Legal Review", icon: Briefcase, timeEstimate: "24-48 hours" },
		{ label: "Risk Assessment", icon: FileText, timeEstimate: "24 hours" },
		{ label: "Final Approval", icon: CheckSquare, timeEstimate: "24 hours" },
	];

	const handleSubmit = () => {
		setIsSubmitting(true);

		setTimeout(() => {
			setIsSubmitting(false);
			setIsSubmitted(true);
			setCurrentStep(0);

			const interval = setInterval(() => {
				setCurrentStep((prevStep) => {
					if (prevStep === 0) {
						setTimeout(() => {
							setCurrentStep(1);
							setTimeout(() => setCurrentStep(2), 2000);
						}, 2000);
					}
					return prevStep;
				});
			}, 1000);

			setTimeout(() => clearInterval(interval), 5000);
		}, 2000);
	};

	const handleStartOver = () => {
		router.push("/");
	};

	return (
		<div className="max-w-3xl mx-auto px-4 py-8">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Final Review</h1>
				<p className="text-gray-600 mt-2">
					Review and submit your Islamic financial product for approval.
				</p>
			</div>

			{!isSubmitted ? (
				<>
					<Card className="mb-8">
						<CardHeader>
							<CardTitle>Product Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							<div>
								<h3 className="flex items-center text-lg font-medium text-gray-900">
									<Briefcase className="w-5 h-5 text-emerald-600 mr-2" />
									Product Type
								</h3>
								<p className="mt-1 text-gray-600">
									Home Financing (Murabaha / Cost-Plus)
								</p>
							</div>

							<div>
								<h3 className="flex items-center text-lg font-medium text-gray-900">
									<FileText className="w-5 h-5 text-emerald-600 mr-2" />
									Document Status
								</h3>
								<div className="mt-1 text-gray-600">
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
										<CheckCircle className="w-3.5 h-3.5 mr-1" />
										Shariah Compliant
									</span>
									<p className="text-sm text-gray-500 mt-1">
										Your document meets all Shariah compliance requirements.
									</p>
								</div>
							</div>

							<div>
								<h3 className="flex items-center text-lg font-medium text-gray-900">
									<Globe className="w-5 h-5 text-emerald-600 mr-2" />
									Target Market
								</h3>
								<p className="mt-1 text-gray-600">United Arab Emirates 🇦🇪</p>
							</div>

							<div>
								<h3 className="flex items-center text-lg font-medium text-gray-900">
									<Clock className="w-5 h-5 text-emerald-600 mr-2" />
									Estimated Timeline
								</h3>
								<p className="mt-1 text-gray-600">
									3–5 business days for full approval
								</p>
							</div>
						</CardContent>
					</Card>

					<div className="text-center space-y-4">
						<p className="text-gray-600">
							By clicking Submit for Review, your product will be sent to our
							Shariah scholars and legal team for final approval.
						</p>
						<Button size="lg" onClick={handleSubmit} disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Submitting...
								</>
							) : (
								"Submit for Review"
							)}
						</Button>
					</div>
				</>
			) : (
				<>
					<div className="text-center mb-8">
						<div className="inline-flex p-4 bg-emerald-100 rounded-full text-emerald-600 mb-4">
							<CheckCircle className="h-12 w-12" />
						</div>
						<h2 className="text-2xl font-bold text-gray-900">
							Your product has been submitted!
						</h2>
						<p className="mt-2 text-gray-600">
							We’ll notify you as it progresses through the review process.
						</p>
					</div>

					<Card className="mb-8">
						<CardHeader>
							<CardTitle>Review Process</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							{steps.map((step, index) => {
								let statusColor = "bg-gray-100 text-gray-500";
								let statusIcon = <Clock className="h-5 w-5" />;
								let label = "Waiting";

								if (index === currentStep) {
									statusColor = "bg-blue-100 text-blue-700";
									statusIcon = <Loader2 className="h-5 w-5 animate-spin" />;
									label = "In Progress";
								} else if (index < currentStep) {
									statusColor = "bg-emerald-100 text-emerald-700";
									statusIcon = <CheckCircle className="h-5 w-5" />;
									label = "Completed";
								}

								return (
									<div key={index} className="flex items-start">
										<div
											className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${statusColor}`}
										>
											{statusIcon}
										</div>
										<div className="ml-4">
											<h3 className="text-lg font-medium text-gray-900">
												{step.label}
											</h3>
											<div className="mt-1 flex items-center">
												<span
													className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
												>
													{label}
												</span>
												<span className="ml-2 text-sm text-gray-500">
													Estimated time: {step.timeEstimate}
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</CardContent>
					</Card>

					<div className="text-center">
						<Button variant="outline" size="lg" onClick={handleStartOver}>
							Start a New Product
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default FinalReview;
