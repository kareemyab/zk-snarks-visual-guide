
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import InteractiveDiagram from '../InteractiveDiagram';
import { CheckCircle, XCircle, Upload, Server, Database, ShieldCheck, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidatorProcessProps {
  className?: string;
}

const ValidatorProcess = ({ className }: ValidatorProcessProps) => {
  const [activeNodeId, setActiveNodeId] = useState<string>('user');
  const [proofStatus, setProofStatus] = useState<'pending' | 'valid' | 'invalid'>('pending');
  const [validatorVotes, setValidatorVotes] = useState<Array<boolean | null>>([null, null, null]);
  const [consensus, setConsensus] = useState<number>(0);
  
  const resetSimulation = () => {
    setProofStatus('pending');
    setValidatorVotes([null, null, null]);
    setConsensus(0);
  };
  
  const submitProof = () => {
    // Simulate validator voting
    setTimeout(() => {
      setValidatorVotes([true, null, null]);
      setConsensus(33);
      
      setTimeout(() => {
        setValidatorVotes([true, true, null]);
        setConsensus(66);
        
        setTimeout(() => {
          setValidatorVotes([true, true, true]);
          setConsensus(100);
          setProofStatus('valid');
        }, 1000);
      }, 1000);
    }, 1000);
  };
  
  const submitInvalidProof = () => {
    // Simulate validator rejecting
    setTimeout(() => {
      setValidatorVotes([false, null, null]);
      setConsensus(33);
      
      setTimeout(() => {
        setValidatorVotes([false, false, null]);
        setConsensus(66);
        
        setTimeout(() => {
          setValidatorVotes([false, false, true]);
          setConsensus(100);
          setProofStatus('invalid');
        }, 1000);
      }, 1000);
    }, 1000);
  };
  
  const nodes = [
    {
      id: 'user',
      x: 100,
      y: 100,
      label: 'User',
      tooltip: (
        <div className="p-1 max-w-xs">
          <p className="font-medium">User</p>
          <p className="text-xs">Creates and submits a zk-proof about some data</p>
        </div>
      ),
      icon: <Upload size={24} />,
      color: 'primary' as const
    },
    {
      id: 'validator1',
      x: 300,
      y: 50,
      label: 'Validator 1',
      tooltip: (
        <div className="p-1 max-w-xs">
          <p className="font-medium">Validator</p>
          <p className="text-xs">Checks if the proof is mathematically valid</p>
        </div>
      ),
      icon: <Server size={24} />,
      color: validatorVotes[0] === null ? 'muted' : validatorVotes[0] ? 'accent' : 'primary' as const
    },
    {
      id: 'validator2',
      x: 300,
      y: 100,
      label: 'Validator 2',
      tooltip: (
        <div className="p-1 max-w-xs">
          <p className="font-medium">Validator</p>
          <p className="text-xs">Checks if the proof is mathematically valid</p>
        </div>
      ),
      icon: <Server size={24} />,
      color: validatorVotes[1] === null ? 'muted' : validatorVotes[1] ? 'accent' : 'primary' as const
    },
    {
      id: 'validator3',
      x: 300,
      y: 150,
      label: 'Validator 3',
      tooltip: (
        <div className="p-1 max-w-xs">
          <p className="font-medium">Validator</p>
          <p className="text-xs">Checks if the proof is mathematically valid</p>
        </div>
      ),
      icon: <Server size={24} />,
      color: validatorVotes[2] === null ? 'muted' : validatorVotes[2] ? 'accent' : 'primary' as const
    },
    {
      id: 'aggregator',
      x: 500,
      y: 100,
      label: 'Aggregator',
      tooltip: (
        <div className="p-1 max-w-xs">
          <p className="font-medium">Aggregator</p>
          <p className="text-xs">Compiles validator votes to reach consensus</p>
        </div>
      ),
      icon: <Users size={24} />,
      color: 'secondary' as const
    },
    {
      id: 'blockchain',
      x: 700,
      y: 100,
      label: 'Blockchain',
      tooltip: (
        <div className="p-1 max-w-xs">
          <p className="font-medium">Blockchain Storage</p>
          <p className="text-xs">Permanently stores verified proofs and public data</p>
        </div>
      ),
      icon: <Database size={24} />,
      color: consensus === 100 ? 'primary' : 'muted' as const
    }
  ];
  
  const connections = [
    { from: 'user', to: 'validator1', animated: proofStatus !== 'pending' },
    { from: 'user', to: 'validator2', animated: proofStatus !== 'pending' },
    { from: 'user', to: 'validator3', animated: proofStatus !== 'pending' },
    { from: 'validator1', to: 'aggregator', animated: validatorVotes[0] !== null },
    { from: 'validator2', to: 'aggregator', animated: validatorVotes[1] !== null },
    { from: 'validator3', to: 'aggregator', animated: validatorVotes[2] !== null },
    { from: 'aggregator', to: 'blockchain', animated: consensus === 100 },
  ];
  
  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>The Validator Consensus Process</CardTitle>
          <CardDescription>See how validators check and reach consensus on zk-proofs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <InteractiveDiagram
            nodes={nodes}
            connections={connections}
            activeNodeId={activeNodeId}
            onNodeClick={setActiveNodeId}
            className="h-64 mb-8"
          />
          
          <div className="bg-zk-light p-4 rounded-md border border-zk-primary/20 mb-4">
            <h3 className="font-medium text-lg mb-2">Validator Consensus</h3>
            <div className="space-y-2">
              <Progress value={consensus} className="h-2" />
              <div className="text-xs text-right">{consensus}% complete</div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm">
                  <span className="font-medium">Proof Status:</span>
                  {proofStatus === 'pending' && <Badge className="ml-2 bg-yellow-500">Pending</Badge>}
                  {proofStatus === 'valid' && <Badge className="ml-2 bg-green-500">Valid</Badge>}
                  {proofStatus === 'invalid' && <Badge className="ml-2 bg-red-500">Invalid</Badge>}
                </div>
                
                <div className="flex space-x-2">
                  {validatorVotes.map((vote, index) => (
                    <div key={index} className="flex items-center">
                      {vote === null && <div className="w-5 h-5 rounded-full bg-gray-300" />}
                      {vote === true && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {vote === false && <XCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant={proofStatus === 'pending' ? "default" : "outline"}
              onClick={resetSimulation}
            >
              Reset
            </Button>
            
            <Button
              variant="outline"
              className="bg-green-50 hover:bg-green-100 text-green-700"
              onClick={submitProof}
              disabled={proofStatus !== 'pending'}
            >
              Submit Valid Proof
            </Button>
            
            <Button
              variant="outline"
              className="bg-red-50 hover:bg-red-100 text-red-700"
              onClick={submitInvalidProof}
              disabled={proofStatus !== 'pending'}
            >
              Submit Invalid Proof
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValidatorProcess;
