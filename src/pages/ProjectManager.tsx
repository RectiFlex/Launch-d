import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Target, Rocket, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';

const ProjectManager = () => {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Project Manager</h1>
            <p className="text-gray-400">Manage your project documentation and business development</p>
          </div>

          <div className="grid gap-8">
            {/* Project Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-500" />
                Project Overview
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Project Name</label>
                    <input
                      type="text"
                      className="w-full bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
                      placeholder="Enter project name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Project Type</label>
                    <select className="w-full bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20">
                      <option>DeFi Protocol</option>
                      <option>NFT Platform</option>
                      <option>GameFi</option>
                      <option>DAO</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Project Description</label>
                  <textarea
                    className="w-full h-32 bg-black/30 rounded-lg p-4 text-gray-300 placeholder-gray-500 border border-purple-900/20"
                    placeholder="Describe your project..."
                  />
                </div>
              </div>
            </motion.section>

            {/* Team Management */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-500" />
                Team Management
              </h2>
              <div className="space-y-4">
                {['Project Lead', 'Smart Contract Developer', 'UI/UX Designer'].map((role, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-purple-900/20 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold">{role}</h3>
                      <p className="text-sm text-gray-400">Unassigned</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Assign
                    </Button>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Documentation */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-500" />
                Documentation
              </h2>
              <div className="space-y-4">
                {[
                  'Business Plan',
                  'Technical Documentation',
                  'Marketing Strategy',
                  'Tokenomics'
                ].map((doc, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-purple-900/20 transition-colors"
                  >
                    <span>{doc}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </motion.section>

            {/* Launch Checklist */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-purple-500" />
                Launch Checklist
              </h2>
              <div className="space-y-4">
                {[
                  'Smart Contract Audit',
                  'KYC Verification',
                  'Marketing Materials',
                  'Community Setup',
                  'Liquidity Lock'
                ].map((item, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 p-4 bg-black/30 rounded-lg cursor-pointer hover:bg-purple-900/20 transition-colors"
                  >
                    <input type="checkbox" className="form-checkbox text-purple-500" />
                    <span className="text-gray-300">{item}</span>
                  </label>
                ))}
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectManager;