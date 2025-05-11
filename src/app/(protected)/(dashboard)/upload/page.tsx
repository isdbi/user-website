"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { Upload, FileText, CheckCircle, MapPin, Check, ArrowLeft, Globe } from "lucide-react"
import Link from "next/link"

// Utility function to conditionally join classNames
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

// Custom Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  children: React.ReactNode
}

function Button({ className, variant = "default", children, ...props }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variantStyles = {
    default: "bg-amber-500 text-white hover:bg-amber-600",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
  }

  return (
    <button className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </button>
  )
}

// Custom Progress Component
interface ProgressProps {
  value?: number
  className?: string
  indicatorClassName?: string
}

function Progress({ value = 0, className, indicatorClassName }: ProgressProps) {
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-100", className)}>
      <div className={cn("h-full bg-amber-500 transition-all", indicatorClassName)} style={{ width: `${value}%` }} />
    </div>
  )
}

// File Upload Step Component
interface FileUploadStepProps {
  state: "empty" | "uploading" | "completed"
  onNext: () => void
}

function FileUploadStep({ state, onNext }: FileUploadStepProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    if (state === "uploading") {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 5
          if (newProgress >= 100) {
            clearInterval(interval)
          }
          return Math.min(newProgress, 100)
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [state])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
      onNext() // Trigger the next state
    }
  }

  if (state === "empty") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8  md:p-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Your File</h1>
        <p className="text-gray-500 mb-10 text-center max-w-md">
          Drag and drop your file here or click to browse your files
        </p>
        <div
          className="border-2 border-dashed border-gray-300 rounded-2xl p-12 w-full max-w-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-colors group bg-gray-50 hover:bg-amber-50"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0])
                onNext()
              }
            }}
          />
          <div className="bg-amber-100 p-6 rounded-full mb-6 group-hover:bg-amber-200 transition-colors">
            <Upload className="h-12 w-12 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-gray-700 text-lg text-center mb-2 font-medium">Drag and drop your file here</p>
          <p className="text-gray-500 text-sm text-center">or click to browse</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">PDF</div>
            <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">DOCX</div>
            <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">JPG</div>
            <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">PNG</div>
          </div>
        </div>
      </div>
    )
  }

  if (state === "uploading") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Uploading File</h1>
        <p className="text-gray-500 mb-10 text-center max-w-md">Please wait while we process your file</p>
        <div className="w-full max-w-xl flex flex-col items-center justify-center">
          <div className="rounded-full bg-amber-100 p-8 mb-8">
            <Upload className="h-16 w-16 text-amber-500 animate-pulse" />
          </div>
          <p className="text-amber-500 text-xl font-medium mb-8">Uploading file...</p>
          <div className="w-full max-w-md">
            <Progress
              value={uploadProgress}
              className="h-3"
              indicatorClassName="bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Processing</span>
              <span>{uploadProgress}%</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col p-8 md:p-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Upload Complete</h1>
      <p className="text-gray-500 mb-10 text-center max-w-md mx-auto">Your file has been successfully uploaded</p>

      <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto gap-8">
        <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center border border-gray-100">
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6 w-full max-w-xs aspect-square flex items-center justify-center">
            <FileText className="h-24 w-24 text-amber-500" />
          </div>
          <div className="text-center">
            <p className="text-gray-800 font-medium text-lg">document.pdf</p>
            <p className="text-gray-500 text-sm mt-1">2.4 MB • PDF Document</p>
          </div>
          <div className="mt-6 flex items-center text-green-500 font-medium">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Successfully uploaded</span>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">File Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">File name:</span>
                <span className="text-gray-800 font-medium">document.pdf</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">File size:</span>
                <span className="text-gray-800 font-medium">2.4 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">File type:</span>
                <span className="text-gray-800 font-medium">PDF Document</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Uploaded on:</span>
                <span className="text-gray-800 font-medium">May 10, 2025</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Progress value={100} indicatorClassName="bg-green-500 rounded-full" />
            <p className="text-green-500 text-sm mt-2 text-right font-medium">Upload complete</p>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-white  px-8 py-2 rounded-xl text-lg font-medium shadow-md hover:shadow-lg transition-all"
              onClick={onNext}
            >
              Continue to Next Step
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Country Selection Step Component
interface CountrySelectionStepProps {
  state: "empty" | "selecting" | "completed"
  onBack: () => void
  onNext: () => void
}

function CountrySelectionStep({ state, onBack, onNext }: CountrySelectionStepProps) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectionProgress, setSelectionProgress] = useState(0)

  useEffect(() => {
    if (state === "selecting") {
      const interval = setInterval(() => {
        setSelectionProgress((prev) => {
          const newProgress = prev + 5
          if (newProgress >= 100) {
            clearInterval(interval)
          }
          return Math.min(newProgress, 100)
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [state])

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country)
    onNext()
  }

  const countries = [
    { name: "Syria", top: "25%", left: "85%" },
    { name: "Algeria", top: "30%", right: "93%" },
    { name: "Egypt", top: "50%", right: "35%" },
    { name: "Libya", bottom: "45%", left: "30%" },
  ]

  if (state === "empty") {
    return (
      <div className="flex-1 flex flex-col p-8 md:p-12">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 text-gray-500 hover:text-gray-700 flex items-center bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Select Country</h1>
        </div>

        <p className="text-gray-500 mb-10 max-w-md">Please select a country from the map below to continue</p>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-3xl h-[500px] rounded-2xl relative overflow-hidden shadow-md">
            {/* Map image */}
            <img 
              src="/map.png" 
              alt="Middle East Map" 
              className="w-full h-full object-cover"
            />

            {/* Interactive map regions */}
            {countries.map((country) => (
              <button
                key={country.name}
                onClick={() => handleSelectCountry(country.name)}
                className="absolute text-sm font-bold hover:text-amber-500 transition-colors hover:scale-110 transform-gpu bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
                style={{
                  top: country.top,
                  left: country.left,
                  right: country.right,
                  bottom: country.bottom,
                }}
              >
                {country.name}
              </button>
            ))}

            {/* Map decorations */}
            <div className="absolute bottom-4 right-4 text-xs text-gray-600 flex items-center bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <Globe className="h-4 w-4 mr-1" />
              <span>Middle East</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={onBack} className="px-6 py-2 rounded-xl">
            Back to Upload
          </Button>
          <Button className="bg-gray-200 text-gray-400 cursor-not-allowed px-6 py-2 rounded-xl" disabled={true}>
            Please Select a Country
          </Button>
        </div>
      </div>
    )
  }

  if (state === "selecting") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Processing Location</h1>
        <p className="text-gray-500 mb-10 text-center max-w-md">Please wait while we verify the selected location</p>

        <div className="w-full max-w-xl flex flex-col items-center justify-center">
          <div className="rounded-full bg-red-100 p-8 mb-8 animate-pulse">
            <MapPin className="h-16 w-16 text-red-500" />
          </div>
          <p className="text-amber-500 text-xl font-medium mb-8">Verifying location...</p>
          <div className="w-full max-w-md bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 rounded-full"
              style={{ width: `${selectionProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between w-full max-w-md mt-2 text-sm text-gray-500">
            <span>Processing</span>
            <span>{selectionProgress}%</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col p-8 md:p-12">
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="mr-4 text-gray-500 hover:text-gray-700 flex items-center bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Location Selected</h1>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto gap-8">
        <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center border border-gray-100">
          <div className="bg-green-100 p-6 rounded-full mb-6">
            <Check className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedCountry || "Saudi Arabia"}</h2>
          <p className="text-gray-500 text-center">Location successfully verified</p>

          <div className="mt-8 w-full max-w-xs bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Region:</span>
              <span className="text-gray-800 font-medium">Middle East</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Currency:</span>
              <span className="text-gray-800 font-medium">
                {selectedCountry === "Egypt"
                  ? "EGP"
                  : selectedCountry === "Saudi Arabia"
                    ? "SAR"
                    : selectedCountry === "Kuwait"
                      ? "KWD"
                      : "USD"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Time Zone:</span>
              <span className="text-gray-800 font-medium">GMT+3</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Country Details</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-medium text-gray-800 mb-2">Shipping Information</h3>
                <p className="text-gray-500 text-sm">
                  Shipping to {selectedCountry || "Saudi Arabia"} typically takes 3-5 business days. International
                  shipping fees may apply.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-medium text-gray-800 mb-2">Import Regulations</h3>
                <p className="text-gray-500 text-sm">
                  Please review the import regulations for {selectedCountry || "Saudi Arabia"} before proceeding.
                  Additional documentation may be required.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={onBack} className="px-6 py-2 rounded-xl">
              Back to Upload
            </Button>
            <Link href={"/template"}>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all">
              Submit
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Component
export default function OrderOverview() {
  // Main navigation between steps
  const [currentStep, setCurrentStep] = useState<"upload" | "country">("upload")

  // Track the state within each step
  const [uploadState, setUploadState] = useState<"empty" | "uploading" | "completed">("empty")
  const [countryState, setCountryState] = useState<"empty" | "selecting" | "completed">("empty")

  const handleNext = () => {
    if (currentStep === "upload") {
      // If we're on the upload step and it's not completed, advance the upload state
      if (uploadState === "empty") {
        setUploadState("uploading")
        // Simulate upload completion after 2 seconds
        setTimeout(() => setUploadState("completed"), 2000)
      } else if (uploadState === "completed") {
        // If upload is completed, move to the next step
        setCurrentStep("country")
      }
    } else if (currentStep === "country") {
      // If we're on the country step, advance the country state
      if (countryState === "empty") {
        setCountryState("selecting")
        // Simulate selection completion after 2 seconds
        setTimeout(() => setCountryState("completed"), 2000)
      }
    }
  }

  const handleBack = () => {
    if (currentStep === "country") {
      setCurrentStep("upload")
    }
  }

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (currentStep === "upload") {
      if (uploadState === "empty") return 0
      if (uploadState === "uploading") return 25
      if (uploadState === "completed") return 50
    } else {
      if (countryState === "empty") return 50
      if (countryState === "selecting") return 75
      if (countryState === "completed") return 100
    }
    return 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-100">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500 ease-in-out rounded-r-full"
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>

      {/* Step indicators */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <div className="flex justify-center">
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "upload" ? "bg-amber-500 text-white" : "bg-white text-amber-500 border-2 border-amber-500"}`}
            >
              1
            </div>
            <div className="w-16 h-0.5 bg-gray-200">
              <div
                className={`h-full bg-amber-500 transition-all duration-300 ${currentStep === "country" ? "w-full" : "w-0"}`}
              ></div>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "country" ? "bg-amber-500 text-white" : "bg-white text-gray-400 border-2 border-gray-200"}`}
            >
              2
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="container mx-auto px-4 py-6">
        {/* Content based on current step */}
        <div className="min-h-[80vh] flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
          {currentStep === "upload" ? (
            <FileUploadStep state={uploadState} onNext={handleNext} />
          ) : (
            <CountrySelectionStep state={countryState} onBack={handleBack} onNext={handleNext} />
          )}
        </div>
      </div>
    </div>
  )
}
