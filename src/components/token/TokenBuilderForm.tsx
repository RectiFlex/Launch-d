import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useCurrentProject } from '../../lib/hooks/useCurrentProject';
import { tokenConfigSchema, type TokenConfig } from '../../lib/validations/tokenBuilder';

interface ValidationError {
  path: string[];
  message: string;
}

const TokenBuilderForm = () => {
  const { currentProject, markStepComplete, updateProjectDetails } = useCurrentProject();
  const [config, setConfig] = useState<TokenConfig>({
    name: '',
    symbol: '',
    initialSupply: '',
    features: {
      mintable: false,
      burnable: false,
      pausable: false,
      staking: false,
      governance: false,
      deflation: false,
    }
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateForm = () => {
    try {
      tokenConfigSchema.parse(config);
      setErrors([]);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        const zodError = JSON.parse(error.message);
        setErrors(zodError.map((err: any) => ({
          path: err.path,
          message: err.message,
        })));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Update project with token configuration
      updateProjectDetails({
        tokenConfig: config,
        completedSteps: [...(currentProject?.completedSteps || []), 'token-config']
      });

      markStepComplete('Token Configuration', 'contract');
    } catch (error) {
      console.error('Error saving token configuration:', error);
      setErrors([{
        path: ['form'],
        message: 'Failed to save token configuration. Please try again.',
      }]);
    }
  };

  const getFieldError = (field: string) => {
    return errors.find(error => error.path[0] === field)?.message;
  };

  const handleFeatureToggle = (feature: keyof TokenConfig['features']) => {
    setConfig(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature]
      }
    }));
  };

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center p-6 bg-black/30 rounded-lg border border-yellow-500/20">
        <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
        <span className="text-yellow-500">Please select a project first</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-zinc-900/50 rounded-2xl p-6 border border-purple-900/20"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Bot className="w-5 h-5 mr-2 text-purple-500" />
        Token Configuration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Token Name</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              className={`w-full bg-black/30 rounded-lg p-3 text-gray-300 border transition-colors ${
                getFieldError('name') 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-purple-900/20 focus:border-purple-500'
              }`}
              placeholder="e.g., My Awesome Token"
            />
            {getFieldError('name') && (
              <p className="text-sm text-red-500 mt-1">{getFieldError('name')}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Token Symbol</label>
            <input
              type="text"
              value={config.symbol}
              onChange={(e) => setConfig({ ...config, symbol: e.target.value.toUpperCase() })}
              className={`w-full bg-black/30 rounded-lg p-3 text-gray-300 border transition-colors ${
                getFieldError('symbol') 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-purple-900/20 focus:border-purple-500'
              }`}
              placeholder="e.g., MTK"
            />
            {getFieldError('symbol') && (
              <p className="text-sm text-red-500 mt-1">{getFieldError('symbol')}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-400">Initial Supply</label>
          <div className="relative">
            <input
              type="text"
              value={config.initialSupply}
              onChange={(e) => setConfig({ ...config, initialSupply: e.target.value })}
              className={`w-full bg-black/30 rounded-lg p-3 text-gray-300 border transition-colors ${
                getFieldError('initialSupply') 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-purple-900/20 focus:border-purple-500'
              }`}
              placeholder="1000000"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              Tokens
            </span>
          </div>
          {getFieldError('initialSupply') && (
            <p className="text-sm text-red-500 mt-1">{getFieldError('initialSupply')}</p>
          )}
        </div>

        <div className="space-y-4">
          <label className="text-sm text-gray-400">Token Features</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(config.features).map(([feature, enabled]) => (
              <label
                key={feature}
                className="flex items-center space-x-2 p-3 bg-black/30 rounded-lg cursor-pointer hover:bg-purple-900/20 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => handleFeatureToggle(feature as keyof TokenConfig['features'])}
                  className="form-checkbox text-purple-500 rounded border-purple-900/20"
                />
                <span className="text-gray-300 capitalize">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {errors.some(error => error.path[0] === 'form') && (
          <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/20">
            <p className="text-sm text-red-500">{getFieldError('form')}</p>
          </div>
        )}

        <div className="pt-4">
          <Button type="submit" variant="primary" className="w-full">
            Generate Smart Contract
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TokenBuilderForm;