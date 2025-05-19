
import React from 'react';
import { cn } from '@/lib/utils';

interface DiagramConnectorProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  animated?: boolean;
  color?: string;
  thickness?: number;
  dashed?: boolean;
  className?: string;
}

const DiagramConnector = ({
  x1,
  y1,
  x2,
  y2,
  animated = false,
  color = 'stroke-zk-secondary',
  thickness = 2,
  dashed = false,
  className
}: DiagramConnectorProps) => {
  // Calculate path
  const path = `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`;
  
  return (
    <svg 
      className={cn("absolute top-0 left-0 w-full h-full pointer-events-none", className)} 
      style={{ zIndex: -1 }}
    >
      <path
        d={path}
        fill="none"
        className={cn(
          color,
          dashed ? "stroke-dasharray-2" : "",
          animated ? "animate-flow" : ""
        )}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={dashed ? "5,5" : "0"}
        style={
          animated 
            ? { 
                strokeDasharray: "1000",
                strokeDashoffset: "1000",
                animation: "flow 1.5s ease-in-out forwards" 
              } 
            : {}
        }
      />
    </svg>
  );
};

export default DiagramConnector;
