
import React, { useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

const Tooltip = ({ content, children, position = 'top', className }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children}
      {isVisible && (
        <div 
          className={cn(
            "absolute z-50 p-2 rounded-md shadow-lg bg-white border border-gray-200 text-sm max-w-xs",
            "transition-opacity duration-200 opacity-100 animate-fade-in", 
            positionClasses[position],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
