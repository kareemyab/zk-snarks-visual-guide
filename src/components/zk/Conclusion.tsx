
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConclusionProps {
  className?: string;
}

const Conclusion = ({ className }: ConclusionProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Key Takeaways</CardTitle>
          <CardDescription>The essential concepts of zk-SNARKs to remember</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-zk-primary rounded-full p-1 flex-shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Zero-Knowledge</h3>
                  <p className="text-sm text-gray-600">
                    zk-SNARKs allow you to prove something without revealing the underlying information. 
                    This creates powerful privacy guarantees while still enabling verification.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-zk-secondary rounded-full p-1 flex-shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Succinct</h3>
                  <p className="text-sm text-gray-600">
                    The proofs are small and quick to verify, even when proving complex statements about large amounts of data.
                    This makes them practical for real-world use.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-zk-accent rounded-full p-1 flex-shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Non-Interactive</h3>
                  <p className="text-sm text-gray-600">
                    Once created, proofs can be verified without any further interaction with the prover,
                    making them ideal for blockchain and other decentralized systems.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-zk-primary rounded-full p-1 flex-shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Circuit-Based</h3>
                  <p className="text-sm text-gray-600">
                    The statements we want to prove must be expressed as mathematical "circuits" with inputs, operations, and outputs.
                    These are converted into cryptographic constraints that the proof validates.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-zk-light to-white p-6 rounded-lg border border-zk-primary/20">
              <h3 className="text-xl font-medium text-center mb-4">The Big Picture</h3>
              <p className="text-center">
                zk-SNARKs are revolutionizing how we think about trust and verification in digital systems.
                By allowing mathematical certainty without compromising privacy, they enable new types of 
                applications that previously had to choose between security and confidentiality.
              </p>
              <div className="flex justify-center mt-4">
                <div className="text-zk-primary font-medium">Privacy + Verification = zk-SNARKs</div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 text-center">
              <p>
                This interactive guide has introduced the basics, but zk-SNARKs are a deep and evolving field.
                We encourage you to continue exploring these powerful cryptographic tools!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Conclusion;
