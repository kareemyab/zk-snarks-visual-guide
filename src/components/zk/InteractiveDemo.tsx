
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Lock, Unlock, Eye, EyeOff } from 'lucide-react';
import CodeBlock from '../CodeBlock';

interface InteractiveDemoProps {
  className?: string;
}

// Helper functions to simulate zk-SNARK operations
const hashData = (data: string): string => {
  // Simple hash function for demo purposes
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash) + data.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
};

const generateWitness = (secretValue: number, threshold: number): string => {
  return JSON.stringify({
    secretValue,
    threshold,
    comparison: secretValue > threshold
  }, null, 2);
};

const generatePublicSignals = (secretValue: number, threshold: number): string => {
  return JSON.stringify({
    threshold,
    hash: hashData(secretValue.toString()),
    result: secretValue > threshold
  }, null, 2);
};

const generateProof = (secretValue: number, threshold: number): string => {
  // In reality, this would be a complex cryptographic proof
  const randomBytes = new Array(4).fill(0).map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
  
  return JSON.stringify({
    pi_a: [hashData(secretValue + threshold + "a"), randomBytes + "1"],
    pi_b: [
      [hashData(threshold + "b1"), hashData(secretValue + "b2")],
      [randomBytes + "3", randomBytes + "4"]
    ],
    pi_c: [hashData(secretValue + threshold + "c"), randomBytes + "5"],
    protocol: "groth16",
    curve: "bn128"
  }, null, 2);
};

const verifyProof = (secretValue: number, threshold: number, providedValue: number): boolean => {
  // In reality, verification would not need the actual secret value
  // This is just for demonstration purposes
  const actualResult = secretValue > threshold;
  const claimedResult = providedValue > threshold;
  return actualResult === claimedResult;
};

const InteractiveDemo = ({ className }: InteractiveDemoProps) => {
  const [secretValue, setSecretValue] = useState<number>(75);
  const [threshold, setThreshold] = useState<number>(50);
  const [revealSecret, setRevealSecret] = useState<boolean>(false);
  const [verificationType, setVerificationType] = useState<'honest' | 'dishonest'>('honest');
  const [verificationValue, setVerificationValue] = useState<number>(75);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  
  const handleVerify = () => {
    const result = verifyProof(
      secretValue,
      threshold,
      verificationType === 'honest' ? secretValue : verificationValue
    );
    setVerificationResult(result);
  };
  
  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Interactive zk-SNARK Sandbox</CardTitle>
          <CardDescription>
            Experiment with a simple zk-SNARK that proves a number is greater than a threshold
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Secret Value Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Your Secret Value
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={() => setRevealSecret(!revealSecret)}
                  >
                    {revealSecret ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </h3>
                <span className="font-mono bg-zk-light px-2 py-1 rounded text-sm">
                  {revealSecret ? secretValue : '•••'}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>0</span>
                  <span>100</span>
                </div>
                <Slider 
                  value={[secretValue]} 
                  min={0} 
                  max={100} 
                  step={1}
                  onValueChange={(value) => setSecretValue(value[0])}
                />
              </div>
              
              <div className="space-y-2 mt-6">
                <h3 className="font-medium flex items-center">
                  <Unlock className="w-4 h-4 mr-2" />
                  Public Threshold
                </h3>
                <div className="flex justify-between text-xs">
                  <span>0</span>
                  <span>{threshold}</span>
                  <span>100</span>
                </div>
                <Slider 
                  value={[threshold]} 
                  min={0} 
                  max={100} 
                  step={1}
                  onValueChange={(value) => setThreshold(value[0])}
                />
                <p className="text-xs text-zk-muted italic mt-1">
                  Everyone knows this threshold value - it's public information
                </p>
              </div>
            </div>
            
            {/* Generated Proof Section */}
            <div className="space-y-4">
              <Tabs defaultValue="witness">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="witness">Witness</TabsTrigger>
                  <TabsTrigger value="publicSignals">Public Signals</TabsTrigger>
                  <TabsTrigger value="proof">Proof</TabsTrigger>
                </TabsList>
                <TabsContent value="witness" className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Full Witness (Private)</h4>
                      {revealSecret ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    </div>
                    <CodeBlock 
                      code={revealSecret ? generateWitness(secretValue, threshold) : '{ "secretValue": "•••", "threshold": ' + threshold + ', "comparison": "•••" }'}
                      language="json"
                      className="text-xs"
                    />
                    <p className="text-xs text-zk-muted">
                      The witness contains all the information, including secrets. It never leaves your device.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="publicSignals" className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Public Signals (Shared)</h4>
                      <Unlock className="h-4 w-4" />
                    </div>
                    <CodeBlock 
                      code={generatePublicSignals(secretValue, threshold)}
                      language="json"
                      className="text-xs"
                    />
                    <p className="text-xs text-zk-muted">
                      Public signals can be shared with verifiers. They include the hashed secret and the result.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="proof" className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">ZK Proof (Shared)</h4>
                      <Unlock className="h-4 w-4" />
                    </div>
                    <CodeBlock 
                      code={generateProof(secretValue, threshold)}
                      language="json"
                      className="text-xs h-32 overflow-y-auto"
                    />
                    <p className="text-xs text-zk-muted">
                      The cryptographic proof that your number is greater than the threshold, without revealing the number.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Verification Section */}
          <div className="border-t pt-6 mt-6">
            <h3 className="font-medium mb-4">Verify the Proof</h3>
            
            <div className="space-y-4">
              <div className="bg-zk-light p-4 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Verification Type</h4>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant={verificationType === 'honest' ? "default" : "outline"}
                    onClick={() => setVerificationType('honest')}
                    className="flex-1"
                  >
                    Honest Verification
                  </Button>
                  <Button
                    variant={verificationType === 'dishonest' ? "default" : "outline"}
                    onClick={() => setVerificationType('dishonest')}
                    className="flex-1"
                  >
                    Try to Cheat
                  </Button>
                </div>
                <p className="text-xs text-zk-muted mt-2">
                  {verificationType === 'honest' 
                    ? "Honest verification uses the correct proof with your real secret value."
                    : "In this mode, you can try to provide a different value and see if the verification detects it."}
                </p>
              </div>
              
              {verificationType === 'dishonest' && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Your Claimed Value</h4>
                  <Input 
                    type="number" 
                    value={verificationValue}
                    onChange={(e) => setVerificationValue(parseInt(e.target.value || "0"))}
                    min={0}
                    max={100}
                  />
                  <p className="text-xs text-zk-muted">
                    Try to claim a value that would give a different result than your actual secret.
                  </p>
                </div>
              )}
              
              <Button onClick={handleVerify} className="w-full">
                Verify Proof
              </Button>
              
              {verificationResult !== null && (
                <div 
                  className={cn(
                    "p-4 rounded-md mt-4 flex items-center justify-between",
                    verificationResult 
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : "bg-red-100 text-red-800 border border-red-300"
                  )}
                >
                  <div>
                    <h4 className="font-medium">
                      {verificationResult 
                        ? "Proof Verified Successfully!"
                        : "Verification Failed!"}
                    </h4>
                    <p className="text-sm">
                      {verificationResult
                        ? "The proof correctly shows that your statement is true."
                        : "The proof is invalid or the claimed statement is false."}
                    </p>
                  </div>
                  {verificationResult 
                    ? <CheckCircle className="h-8 w-8 text-green-600" />
                    : <XCircle className="h-8 w-8 text-red-600" />}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveDemo;
