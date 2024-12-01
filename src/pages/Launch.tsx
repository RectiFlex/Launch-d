import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Globe, Users, BarChart3, Shield, Lock, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const Launch = () => {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Launch Your Project</h1>
            <p className="text-gray-400">Deploy your project and connect with the community</p>
          </div>

          <div className="grid gap-8">
            {/* Launch Requirements */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-500" />
                Launch Requirements
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Smart Contract Audit', status: 'Completed', icon: <Shield className="w-4 h-4" /> },
                  { label: 'KYC Verification', status: 'Pending', icon: <Users className="w-4 h-4" /> },
                  { label: 'Liquidity Lock', status: 'Not Started', icon: <Lock className="w-4 h-4" /> },
                  { label: 'Marketing Materials', status: 'In Progress', icon: <Globe className="w-4 h-4" /> }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-purple-500">{item.icon}</div>
                      <span>{item.label}</span>
                    </div>
                    <span className={`text-sm ${
                      item.status === 'Completed' ? 'text-green-500' :
                      item.status === 'In Progress' ? 'text-yellow-500' :
                      item.status === 'Pending' ? 'text-purple-500' :
                      'text-gray-400'
                    }`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Launch Configuration */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-purple-500" />
                Launch Configuration
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Launch Date</label>
                    <input
                      type="datetime-local"
                      className="w-full bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Initial Price</label>
                    <input
                      type="number"
                      className="w-full bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20"
                      placeholder="0.0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Launch Platform</label>
                  <select className="w-full bg-black/30 rounded-lg p-2 text-gray-300 border border-purple-900/20">
                    <option>Uniswap</option>
                    <option>PancakeSwap</option>
                    <option>SushiSwap</option>
                  </select>
                </div>
              </div>
            </motion.section>

            {/* Community Setup */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-500" />
                Community Setup
              </h2>
              <div className="space-y-4">
                {[
                  { platform: 'Discord', members: '2.5k' },
                  { platform: 'Telegram', members: '5k' },
                  { platform: 'Twitter', members: '10k' }
                ].map((social, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
                  >
                    <span>{social.platform}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-500">{social.members}</span>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Analytics & Tracking */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
                Analytics & Tracking
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Community Growth', value: '+25%' },
                  { label: 'Engagement Rate', value: '68%' },
                  { label: 'Market Interest', value: 'High' },
                  { label: 'Launch Readiness', value: '85%' }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 bg-black/30 rounded-lg"
                  >
                    <div className="text-sm text-gray-400">{stat.label}</div>
                    <div className="text-xl font-bold text-purple-500">{stat.value}</div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Launch Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <Button variant="primary" size="lg" className="w-full md:w-auto">
                <Rocket className="w-5 h-5 mr-2" />
                Launch Project
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Launch;