
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InteractiveDiagram, { NodePosition, Connection } from '../InteractiveDiagram';
import { Lock, Unlock, Key, FileText, Database, Code, FileCheck, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ZkProcessProps {
  className?: string;
}

const ZkProcess = ({ className }: ZkProcessProps) => {
  const [activeNodeId, setActiveNodeId] = useState<string>('input');
  const [animationStep, setAnimationStep] = useState<number>(0);

  const handleNodeClick = (id: string) => {
    setActiveNodeId(id);
  };

  const nodes: NodePosition[] = [
    {
      id: 'input',
      x: 100,
      y: 100,
      label: 'Input Data',
      tooltip: (
        <div className="p-1 max-w-xs">
          <p className="font-medium">Input Data</p>
          <p className="text-xs">The private information you want to prove something about without revealing it.</p>
        </div>
      ),
      icon: <FileText size={24} />,
      color: 'primary'
    },
    {
      id: 'circuit',
      x: 250,
      y: 100,
      label: 'ZK Circuit',
      tooltip: (
        <div className="p-1 max-w-xs">
          <p className="font-medium">ZK Circuit</p>
          <p className="text-xs">A mathematical representation of what you're trying to prove, encoded as constraints.</p>
        </div>
      ),
      icon: <Code size={24} />,
      color: 'secondary'
    },
    {
      id: 'witness',
      x: 400,
      y: 50,
      label: 'Witness Generation',
      tooltip: (
        <div className="p-1 max-w-xs">
          <p className="font-medium">Witness</p>
          <p className="text-xs">The complete solution to the circuit, including all the private information.</p>
        </div>
      ),
      icon: <Key size={24} />,
      color: 'muted'
    },
    {
      id: 'publicSignals',
      x: 400,
      y: 150,
      label: 'Public Signals',
      tooltip: (
        <div className="p-1 max-w-xs">
          <p className="font-medium">Public Signals</p>
          <p className="text-xs">The publicly shared outputs from your calculation that anyone can see.</p>
        </div>
      ),
      icon: <Database size={24} />,
      color: 'muted'
    },
    {
      id: 'proof',
      x: 550,
      y: 100,
      label: 'ZK Proof',
      tooltip: (
        <div className="p-1 max-w-xs">
          <p className="font-medium">ZK Proof</p>
          <p className="text-xs">A compact cryptographic proof that your input satisfies the circuit constraints without revealing the input itself.</p>
        </div>
      ),
      icon: <ShieldCheck size={24} />,
      color: 'accent'
    },
    {
      id: 'verification',
      x: 700,
      y: 100,
      label: 'Verification',
      tooltip: (
        <div className="p-1 max-w-xs">
          <p className="font-medium">Verification</p>
          <p className="text-xs">Anyone can verify your proof is correct without seeing your private data.</p>
        </div>
      ),
      icon: <FileCheck size={24} />,
      color: 'primary'
    },
  ];

  const getConnections = (): Connection[] => {
    const baseConnections: Connection[] = [
      { from: 'input', to: 'circuit', animated: animationStep >= 1 },
    ];

    if (animationStep >= 2) {
      baseConnections.push(
        { from: 'circuit', to: 'witness', animated: animationStep === 2 },
        { from: 'circuit', to: 'publicSignals', animated: animationStep === 2 }
      );
    }

    if (animationStep >= 3) {
      baseConnections.push(
        { from: 'witness', to: 'proof', animated: animationStep === 3 },
        { from: 'publicSignals', to: 'proof', animated: animationStep === 3 }
      );
    }

    if (animationStep >= 4) {
      baseConnections.push(
        { from: 'proof', to: 'verification', animated: animationStep === 4 },
        { from: 'publicSignals', to: 'verification', animated: animationStep === 4, dashed: true }
      );
    }

    return baseConnections;
  };

  const stepDescriptions = [
    {
      title: 'Start with private data',
      description: 'This is information you want to prove something about, without revealing it to others.'
    },
    {
      title: 'Process through a ZK Circuit',
      description: 'This circuit mathematically represents what you\'re trying to prove about your data.'
    },
    {
      title: 'Generate witness & public signals',
      description: 'The witness contains all solution values (private), while public signals are shared values anyone can see.'
    },
    {
      title: 'Create the ZK Proof',
      description: 'Using cryptographic magic, a proof is generated that validates your claim without revealing your private data.'
    },
    {
      title: 'Verify the proof',
      description: 'Anyone can verify the proof is valid using only the proof itself and the public signals.'
    }
  ];
  
  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>The zk-SNARK Process</CardTitle>
          <CardDescription>See how data becomes a zero-knowledge proof</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <InteractiveDiagram
            nodes={nodes}
            connections={getConnections()}
            activeNodeId={activeNodeId}
            onNodeClick={handleNodeClick}
            className="h-64 mb-8"
          />
          
          <div className="bg-zk-light p-4 rounded-md border border-zk-primary/20">
            <h3 className="font-medium text-lg mb-2">
              {activeNodeId ? nodes.find(n => n.id === activeNodeId)?.label : 'Select a component'}
            </h3>
            {activeNodeId ? (
              <p className="text-sm">
                {nodes.find(n => n.id === activeNodeId)?.tooltip?.props.children[2].props.children}
              </p>
            ) : (
              <p className="text-sm">Click on any component in the diagram to learn more about it.</p>
            )}
          </div>
          
          <div className="flex flex-col space-y-4">
            <div className="text-sm">
              <span className="font-medium">Step {animationStep + 1}:</span> {stepDescriptions[animationStep].title}
              <p className="text-xs text-gray-500 mt-1">
                {stepDescriptions[animationStep].description}
              </p>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setAnimationStep(Math.max(0, animationStep - 1))}
                disabled={animationStep === 0}
              >
                Previous Step
              </Button>
              
              <Button 
                onClick={() => setAnimationStep(Math.min(4, animationStep + 1))}
                disabled={animationStep === 4}
              >
                Next Step
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZkProcess;
