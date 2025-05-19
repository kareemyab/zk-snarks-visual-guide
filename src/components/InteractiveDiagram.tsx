
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import DiagramNode from './DiagramNode';
import DiagramConnector from './DiagramConnector';
import Tooltip from './Tooltip';
import { Lock, Unlock, Key, FileCheck, Database, UserCircle, ShieldCheck, Code } from 'lucide-react';

interface NodePosition {
  id: string;
  x: number;
  y: number;
  label: string;
  tooltip?: React.ReactNode;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'muted';
}

interface Connection {
  from: string;
  to: string;
  animated?: boolean;
  dashed?: boolean;
}

interface InteractiveDiagramProps {
  nodes: NodePosition[];
  connections: Connection[];
  activeNodeId?: string;
  onNodeClick?: (id: string) => void;
  className?: string;
}

const InteractiveDiagram = ({
  nodes,
  connections,
  activeNodeId,
  onNodeClick,
  className
}: InteractiveDiagramProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<Map<string, { x: number; y: number }>>(new Map());
  
  // Update node positions when the container is resized
  useEffect(() => {
    const updateNodePositions = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      
      const newPositions = new Map<string, { x: number; y: number }>();
      
      nodes.forEach(node => {
        // Convert percentage to actual pixels
        const relativeX = node.x;
        const relativeY = node.y;
        
        newPositions.set(node.id, {
          x: relativeX,
          y: relativeY
        });
      });
      
      setNodePositions(newPositions);
    };
    
    updateNodePositions();
    
    window.addEventListener('resize', updateNodePositions);
    return () => {
      window.removeEventListener('resize', updateNodePositions);
    };
  }, [nodes]);
  
  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full h-96", className)}
    >
      {/* Render connections */}
      {connections.map((connection, index) => {
        const fromPos = nodePositions.get(connection.from);
        const toPos = nodePositions.get(connection.to);
        
        if (!fromPos || !toPos) return null;
        
        return (
          <DiagramConnector
            key={`${connection.from}-${connection.to}-${index}`}
            x1={fromPos.x}
            y1={fromPos.y}
            x2={toPos.x}
            y2={toPos.y}
            animated={connection.animated}
            dashed={connection.dashed}
          />
        );
      })}
      
      {/* Render nodes */}
      {nodes.map(node => (
        <DiagramNode
          key={node.id}
          id={node.id}
          x={node.x}
          y={node.y}
          label={node.label}
          tooltip={node.tooltip}
          icon={node.icon}
          color={node.color}
          active={activeNodeId === node.id}
          onClick={() => onNodeClick && onNodeClick(node.id)}
        />
      ))}
    </div>
  );
};

export default InteractiveDiagram;
