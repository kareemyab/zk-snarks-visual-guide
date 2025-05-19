
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Tooltip from './Tooltip';

interface DiagramNodeProps {
  id: string;
  x: number;
  y: number;
  label: string;
  tooltip?: ReactNode;
  icon?: ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'muted';
  pulse?: boolean;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

const DiagramNode = ({
  id,
  x,
  y,
  label,
  tooltip,
  icon,
  color = 'primary',
  pulse = false,
  onClick,
  active = false,
  className
}: DiagramNodeProps) => {
  const colorClasses = {
    primary: 'bg-zk-primary text-white',
    secondary: 'bg-zk-secondary text-white',
    accent: 'bg-zk-accent text-white',
    muted: 'bg-zk-muted text-white'
  };

  const nodeContent = (
    <div
      id={id}
      className={cn(
        'absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2',
        'cursor-pointer transition-all duration-300',
        className
      )}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      onClick={onClick}
    >
      <div
        className={cn(
          'rounded-full p-3 shadow-md transition-all duration-300',
          colorClasses[color],
          pulse && 'animate-pulse-slow',
          active && 'ring-2 ring-offset-2 ring-zk-highlight'
        )}
      >
        {icon || <div className="w-6 h-6" />}
      </div>
      <div className="mt-2 text-xs font-medium text-center max-w-[100px]">{label}</div>
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip} position="top">
        {nodeContent}
      </Tooltip>
    );
  }

  return nodeContent;
};

export default DiagramNode;
