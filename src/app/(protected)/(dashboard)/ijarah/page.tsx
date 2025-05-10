"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProgressProps {
  value: number;
}

function CustomProgress({ value }: ProgressProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-amber-500 h-4 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-6 border rounded shadow bg-white">
            <h2 className="text-lg font-semibold mb-4">Uploading File...</h2>
            <div className="flex flex-col items-center">
              <CustomProgress value={45} />
              <p className="mt-4 text-sm">Uploading 45%...</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="p-6 border rounded shadow bg-white">
            <h2 className="text-lg font-semibold mb-4">Verifying</h2>
            <div className="flex flex-col items-center">
              <CustomProgress value={100} />
              <p className="mt-4 text-sm">Verifying 100%...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 border rounded shadow bg-white">
            <p className="text-center">Step {step + 1} content goes here...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-6">
        {renderStep()}
        <div className="flex justify-between">
          <Button onClick={prev} disabled={step === 0} variant="secondary">
            Back
          </Button>
          <Button onClick={next} disabled={step === 5}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
