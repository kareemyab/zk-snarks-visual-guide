
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import StepNavigation from '@/components/StepNavigation';
import Introduction from '@/components/zk/Introduction';
import ZkProcess from '@/components/zk/ZkProcess';
import ValidatorProcess from '@/components/zk/ValidatorProcess';
import InteractiveDemo from '@/components/zk/InteractiveDemo';
import RealWorldUses from '@/components/zk/RealWorldUses';
import Conclusion from '@/components/zk/Conclusion';
import { ChevronUp } from 'lucide-react';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 6;

  const handleNext = () => {
    setCurrentStep(Math.min(currentStep + 1, totalSteps - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Map steps to components
  const steps = [
    <Introduction key="intro" />,
    <ZkProcess key="zk-process" />,
    <ValidatorProcess key="validator-process" />,
    <InteractiveDemo key="interactive-demo" />,
    <RealWorldUses key="real-world-uses" />,
    <Conclusion key="conclusion" />
  ];

  const stepTitles = [
    "Introduction",
    "The zk-SNARK Process",
    "Validator Consensus",
    "Interactive Demo",
    "Real-World Applications",
    "Conclusion"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-zk-primary">
              zk-SNARK Explorer
            </h1>
            <div className="text-sm hidden sm:block">
              Step {currentStep + 1} of {totalSteps}: {stepTitles[currentStep]}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 mb-16">
        <div className="max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8 hidden sm:block">
            <div className="flex justify-between mb-2">
              {stepTitles.map((title, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "text-xs font-medium text-center flex-1",
                    currentStep >= index ? "text-zk-primary" : "text-gray-400"
                  )}
                >
                  {title}
                </div>
              ))}
            </div>
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-zk-primary transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Current step content */}
          <div className="mb-8 animate-fade-in">
            {steps[currentStep]}
          </div>

          {/* Debunk link */}
          <div className="mb-6 text-center">
            <a href="/debunk-emc2" className="text-blue-600 hover:underline">Debunk E=mc²</a>
          </div>
          {/* Navigation */}
          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onPrevious={handlePrevious}
            className="mt-12"
          />
        </div>
      </main>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-zk-primary text-white p-3 rounded-full shadow-lg hover:bg-zk-secondary transition-colors"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 px-4 text-center text-sm text-gray-600">
        <div className="container mx-auto">
          <p>
            zk-SNARK Explorer - An educational tool for understanding zero-knowledge proofs
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
