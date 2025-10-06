import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();

// Blockchain networks configuration
export const blockchainConfig = {
  networks: {
    ethereum: {
      name: 'Ethereum Mainnet',
      rpcUrl: process.env.ETHEREUM_NODE_URL || 'https://mainnet.infura.io/v3/your_infura_key',
      chainId: 1,
      explorer: 'https://etherscan.io'
    },
    polygon: {
      name: 'Polygon Mainnet',
      rpcUrl: process.env.POLYGON_NODE_URL || 'https://polygon-mainnet.infura.io/v3/your_infura_key',
      chainId: 137,
      explorer: 'https://polygonscan.com'
    },
    mumbai: {
      name: 'Polygon Mumbai Testnet',
      rpcUrl: process.env.MUMBAI_NODE_URL || 'https://polygon-mumbai.infura.io/v3/your_infura_key',
      chainId: 80001,
      explorer: 'https://mumbai.polygonscan.com'
    },
    ganache: {
      name: 'Local Ganache',
      rpcUrl: 'http://localhost:8545',
      chainId: 1337,
      explorer: null
    }
  }
};

// Current active network
export const activeNetwork = process.env.BLOCKCHAIN_NETWORK || 'mumbai';

// Initialize Web3 with active network
export const initWeb3 = () => {
  try {
    const networkConfig = blockchainConfig.networks[activeNetwork];
    
    if (!networkConfig) {
      throw new Error(`Network '${activeNetwork}' not found in configuration`);
    }

    const web3 = new Web3(networkConfig.rpcUrl);
    
    console.log(`⛓️  Web3 connected to: ${networkConfig.name}`);
    console.log(`🔗 RPC URL: ${networkConfig.rpcUrl}`);
    console.log(`🆔 Chain ID: ${networkConfig.chainId}`);
    
    return web3;
  } catch (error) {
    console.error('❌ Web3 initialization failed:', error.message);
    throw error;
  }
};

// Contract configuration
export const contractConfig = {
  // Contract ABI will be loaded from file
  address: process.env.CONTRACT_ADDRESS,
  gasLimit: 300000,
  gasPrice: '5000000000' // 5 Gwei
};

// Admin wallet configuration (for contract interactions)
export const adminWalletConfig = {
  address: process.env.ADMIN_WALLET_ADDRESS,
  privateKey: process.env.ADMIN_WALLET_PRIVATE_KEY // Never log this!
};

// Validate blockchain configuration
export const validateBlockchainConfig = () => {
  const required = [
    'CONTRACT_ADDRESS',
    'ADMIN_WALLET_ADDRESS',
    'ADMIN_WALLET_PRIVATE_KEY'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn('⚠️  Missing blockchain environment variables:', missing);
    return false;
  }

  console.log('✅ Blockchain configuration validated');
  return true;
};

export default {
  blockchainConfig,
  activeNetwork,
  contractConfig,
  adminWalletConfig,
  initWeb3,
  validateBlockchainConfig
};