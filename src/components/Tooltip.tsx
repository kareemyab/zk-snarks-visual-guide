
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
      onClick={(e) => {
        e.stopPropagation(); // Prevent click from propagating to parent elements
        setIsVisible(!isVisible);
      }}
    >
      {children}
      {isVisible && (
        <div 
          className={cn(
            "fixed z-50 p-2 rounded-md shadow-lg bg-white border border-gray-200 text-sm max-w-xs",
            "transition-opacity duration-200 opacity-100 animate-fade-in", 
            className
          )}
          style={{
            top: position === 'bottom' ? 'calc(100% + 8px)' : position === 'top' ? 'auto' : '50%',
            bottom: position === 'top' ? 'calc(100% + 8px)' : 'auto',
            left: position === 'right' ? 'calc(100% + 8px)' : position === 'left' ? 'auto' : '50%',
            right: position === 'left' ? 'calc(100% + 8px)' : 'auto',
            transform: (position === 'top' || position === 'bottom') ? 'translateX(-50%)' : 
                      (position === 'left' || position === 'right') ? 'translateY(-50%)' : 'none',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
