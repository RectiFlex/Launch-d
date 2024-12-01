import React from 'react';
import { motion } from 'framer-motion';
import { Search, AlertTriangle, CheckCircle, Code2 } from 'lucide-react';
import Button from '../components/ui/Button';

const SmartContractAuditor = () => {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Smart Contract Auditor</h1>
            <p className="text-gray-400">AI-powered smart contract analysis and security auditing</p>
          </div>

          {/* Code Input */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20 mb-8"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Code2 className="w-5 h-5 mr-2 text-purple-500" />
              Contract Code
            </h2>
            <div className="space-y-4">
              <textarea
                className="w-full h-64 bg-black/30 rounded-lg p-4 font-mono text-sm text-gray-300 placeholder-gray-500 border border-purple-900/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                placeholder="Paste your smart contract code here..."
              />
              <div className="flex gap-4">
                <Button variant="primary" className="flex-1">
                  <Search className="w-4 h-4 mr-2" />
                  Start Audit
                </Button>
                <Button variant="outline">
                  Upload File
                </Button>
              </div>
            </div>
          </motion.section>

          {/* Analysis Results */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid gap-8"
          >
            {/* Vulnerabilities */}
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                Potential Vulnerabilities
              </h2>
              <div className="space-y-4">
                {['Reentrancy Risk', 'Overflow Possibility', 'Unchecked Return Values'].map((issue, index) => (
                  <div
                    key={index}
                    className="p-4 bg-black/30 rounded-lg border border-yellow-500/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-yellow-500">{issue}</span>
                      <span className="text-sm text-gray-400">High Risk</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Potential vulnerability detected in function. Consider implementing recommended safeguards.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Optimization Suggestions */}
            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                Optimization Suggestions
              </h2>
              <div className="space-y-4">
                {['Gas Optimization', 'Code Simplification', 'Best Practices'].map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 bg-black/30 rounded-lg border border-green-500/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-green-500">{suggestion}</span>
                      <span className="text-sm text-gray-400">Recommended</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Suggested improvements to enhance contract efficiency and security.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default SmartContractAuditor;