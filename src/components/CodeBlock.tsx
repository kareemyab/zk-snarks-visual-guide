
import React from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeBlock = ({ code, language = 'javascript', className }: CodeBlockProps) => {
  return (
    <div className={cn("rounded-md overflow-hidden", className)}>
      <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400">
        {language}
      </div>
      <pre className="p-4 bg-gray-900 text-gray-100 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
