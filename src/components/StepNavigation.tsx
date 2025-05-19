
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  className?: string;
}

const StepNavigation = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious,
  className 
}: StepNavigationProps) => {
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              currentStep === index 
                ? "bg-zk-primary scale-125" 
                : "bg-gray-300"
            )}
          />
        ))}
      </div>
      
      <Button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default StepNavigation;
