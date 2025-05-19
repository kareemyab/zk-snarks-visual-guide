
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Tooltip from '../Tooltip';

interface IntroductionProps {
  className?: string;
}

const Introduction = ({ className }: IntroductionProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <Card className="border-2 border-zk-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold text-center">Understanding zk-SNARKs</CardTitle>
          <CardDescription className="text-center text-base">
            Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="leading-7">
            Welcome! Today we're going to explore{' '}
            <Tooltip content="Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge: a way to prove you know something without revealing what you know">
              <span className="text-zk-primary font-semibold cursor-help border-b border-dotted border-zk-primary">zk-SNARKs</span>
            </Tooltip>
            , a powerful tool used in blockchain and privacy technology.
          </p>
          
          <div className="bg-zk-light rounded-md p-4 border-l-4 border-zk-primary">
            <h3 className="text-lg font-semibold mb-2">What are zk-SNARKs?</h3>
            <p>
              Think of zk-SNARKs as a magical way to prove you know a secret without actually revealing the secret itself. 
              Like proving you know the password to a safe without actually telling anyone what that password is.
            </p>
          </div>
          
          <h3 className="text-lg font-semibold">Why are they important?</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">Privacy</span>: Prove things without revealing sensitive information
            </li>
            <li>
              <span className="font-medium">Efficiency</span>: Verifying proofs is much faster than checking the original data
            </li>
            <li>
              <span className="font-medium">Trust</span>: Create verifiable systems without requiring blind trust in any party
            </li>
          </ul>
          
          <p className="italic text-zk-muted text-sm">
            As we go through this interactive guide, we'll break down complex concepts into easy-to-understand pieces.
            Each section builds on the previous one, so take your time!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Introduction;
