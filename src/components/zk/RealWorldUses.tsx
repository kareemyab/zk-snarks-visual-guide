
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Shield, FileText, Wallet, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RealWorldUsesProps {
  className?: string;
}

const RealWorldUses = ({ className }: RealWorldUsesProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Real-World Applications of zk-SNARKs</CardTitle>
          <CardDescription>Explore how this technology is being used today</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="privacy">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="scalability">Scalability</TabsTrigger>
              <TabsTrigger value="content">Content Trust</TabsTrigger>
            </TabsList>
            
            <TabsContent value="privacy" className="space-y-4">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-zk-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-1">Private Transactions</h3>
                  <p className="text-sm text-gray-600">
                    zk-SNARKs enable private cryptocurrency transactions where the sender, receiver, and amount remain hidden, 
                    while still proving that no money was created or destroyed.
                  </p>
                </div>
              </div>
              
              <div className="bg-zk-light p-4 rounded-md">
                <h4 className="font-medium mb-2">Example: Zcash</h4>
                <p className="text-sm">
                  Zcash was one of the first cryptocurrencies to implement zk-SNARKs for shielded transactions, 
                  allowing users to prove they have sufficient funds without revealing their balance.
                </p>
              </div>
              
              <div className="flex items-start gap-4 mt-4">
                <div className="h-8 w-8 bg-zk-secondary rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1">
                  ID
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Identity Verification</h3>
                  <p className="text-sm text-gray-600">
                    Users can prove they meet certain criteria (age, credit score, residence) without revealing the actual data.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="verification" className="space-y-4">
              <div className="flex items-start gap-4">
                <FileText className="h-8 w-8 text-zk-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-1">Document Authenticity</h3>
                  <p className="text-sm text-gray-600">
                    zk-SNARKs can prove a document is signed by a particular authority without revealing the document itself 
                    or the full signature.
                  </p>
                </div>
              </div>
              
              <div className="bg-zk-light p-4 rounded-md">
                <h4 className="font-medium mb-2">Example: Academic Credentials</h4>
                <p className="text-sm">
                  A university graduate can prove they have a degree with a certain GPA from a specific institution
                  without revealing their transcript, student ID, or other private information.
                </p>
              </div>
              
              <div className="flex items-start gap-4 mt-4">
                <CheckCircle className="h-8 w-8 text-zk-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-1">Compliance Checks</h3>
                  <p className="text-sm text-gray-600">
                    Organizations can prove they follow regulatory requirements without exposing sensitive internal data.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="scalability" className="space-y-4">
              <div className="flex items-start gap-4">
                <Wallet className="h-8 w-8 text-zk-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-1">zk-Rollups</h3>
                  <p className="text-sm text-gray-600">
                    These are Layer-2 scaling solutions for blockchains that use zk-SNARKs to verify the validity of
                    many transactions at once, dramatically increasing throughput.
                  </p>
                </div>
              </div>
              
              <div className="bg-zk-light p-4 rounded-md">
                <h4 className="font-medium mb-2">Example: zkSync</h4>
                <p className="text-sm">
                  zkSync uses zk-SNARKs to "roll up" hundreds or thousands of transactions into a single proof that
                  can be verified on Ethereum, reducing fees and increasing capacity while maintaining security.
                </p>
              </div>
              
              <div className="flex items-start gap-4 mt-4">
                <div className="h-8 w-8 bg-zk-secondary rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1">
                  ⚡
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Fast Withdrawals</h3>
                  <p className="text-sm text-gray-600">
                    zk-proofs allow secure withdrawals from Layer-2 to Layer-1 without lengthy challenge periods.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4">
              <div className="flex items-start gap-4">
                <Globe className="h-8 w-8 text-zk-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium mb-1">Content Verification Systems</h3>
                  <p className="text-sm text-gray-600">
                    zk-SNARKs can verify digital content is authentic without revealing the original content or source.
                  </p>
                </div>
              </div>
              
              <div className="bg-zk-light p-4 rounded-md">
                <h4 className="font-medium mb-2">Example: Trust Engine</h4>
                <p className="text-sm">
                  In decentralized content verification systems, validators can use zk-SNARKs to verify content 
                  meets certain criteria without accessing the actual content, preserving privacy while ensuring trust.
                </p>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  <li>Validators reach consensus on content authenticity</li>
                  <li>Content creators maintain privacy over their work</li>
                  <li>End users receive confidence in content authenticity</li>
                </ul>
              </div>
              
              <div className="flex items-start gap-4 mt-4">
                <div className="h-8 w-8 bg-zk-accent rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1">
                  AI
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">AI Content Validation</h3>
                  <p className="text-sm text-gray-600">
                    Verifying AI-generated content authenticity without revealing proprietary models or training data.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealWorldUses;
