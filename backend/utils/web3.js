import Web3 from 'web3';

// Mock ABI for development (replace with actual ABI when you have the contract)
const ProductAuthenticationABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "productId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "farmer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "productType",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "admin",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "qualityData",
        "type": "string"
      }
    ],
    "name": "ProductVerified",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      }
    ],
    "name": "checkAuthentication",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      }
    ],
    "name": "getProductAuth",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "productId",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "productType",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "qualityData",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "productCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "products",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "productId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "farmer",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "productType",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "verifiedBy",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "qualityData",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_farmer",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "_productType",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_qualityData",
        "type": "string"
      }
    ],
    "name": "verifyProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Initialize Web3 (mock for development)
let web3;
let contract;

// Development mode - mock blockchain interactions
const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.CONTRACT_ADDRESS;

if (isDevelopment) {
  console.log('🔧 Running in development mode - using mock blockchain');
} else {
  try {
    web3 = new Web3(process.env.POLYGON_NODE_URL || 'http://localhost:8545');
    const contractAddress = process.env.CONTRACT_ADDRESS;
    contract = new web3.eth.Contract(ProductAuthenticationABI, contractAddress);
    console.log('⛓️  Web3 connected to blockchain');
  } catch (error) {
    console.log('⚠️  Blockchain connection failed, using mock mode');
  }
}

// Mock blockchain verification for development
const mockVerifyOnBlockchain = async (productData) => {
  console.log('🔧 [MOCK] Verifying product on blockchain:', productData.productId);
  
  // Simulate blockchain transaction delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    success: true,
    transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
    blockNumber: Math.floor(Math.random() * 10000) + 1000000,
    timestamp: new Date().toISOString(),
    message: 'Product verified on blockchain (mock)'
  };
};

// Mock blockchain check for development
const mockCheckVerification = async (productId) => {
  console.log('🔧 [MOCK] Checking product verification:', productId);
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    isVerified: true,
    verifiedBy: '0x' + Math.random().toString(16).substr(2, 40),
    verificationDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    productData: {
      name: 'Mock Product',
      category: 'sugar',
      verificationId: productId
    },
    message: 'Verification check completed (mock)'
  };
};

// Real blockchain verification
const realVerifyOnBlockchain = async (productData) => {
  try {
    const accounts = await web3.eth.getAccounts();
    
    const transaction = await contract.methods.verifyProduct(
      productData.productId,
      productData.farmerWallet,
      productData.productType || 0,
      productData.ipfsHash || '',
      JSON.stringify(productData.productData || {})
    ).send({
      from: accounts[0],
      gas: 300000
    });

    return {
      success: true,
      transactionHash: transaction.transactionHash,
      blockNumber: transaction.blockNumber,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('❌ Blockchain verification error:', error);
    throw new Error('Failed to verify product on blockchain: ' + error.message);
  }
};

// Real blockchain check
const realCheckVerification = async (productId) => {
  try {
    const product = await contract.methods.getProductAuth(productId).call();
    
    return {
      isVerified: product.isVerified,
      verifiedBy: product.verifiedBy,
      verificationDate: new Date(parseInt(product.timestamp) * 1000),
      productData: JSON.parse(product.qualityData || '{}')
    };

  } catch (error) {
    console.error('❌ Blockchain check error:', error);
    throw new Error('Failed to check product verification: ' + error.message);
  }
};

// Export functions (use mock in development, real in production)
export const verifyOnBlockchain = isDevelopment ? mockVerifyOnBlockchain : realVerifyOnBlockchain;
export const checkVerification = isDevelopment ? mockCheckVerification : realCheckVerification;

// Get contract stats
export const getContractStats = async () => {
  if (isDevelopment) {
    return {
      totalVerifiedProducts: Math.floor(Math.random() * 100) + 50,
      contractAddress: '0xMOCKCONTRACT' + Math.random().toString(16).substr(2, 10),
      network: 'Mock Network',
      message: 'Development mode - using mock data'
    };
  }

  try {
    const productCount = await contract.methods.productCount().call();
    
    return {
      totalVerifiedProducts: parseInt(productCount),
      contractAddress: process.env.CONTRACT_ADDRESS,
      network: 'Polygon Mainnet'
    };

  } catch (error) {
    console.error('Contract stats error:', error);
    throw new Error('Failed to get contract statistics');
  }
};

// Test blockchain connection
export const testBlockchainConnection = async () => {
  if (isDevelopment) {
    return {
      connected: true,
      mode: 'development',
      message: 'Using mock blockchain for development'
    };
  }

  try {
    const blockNumber = await web3.eth.getBlockNumber();
    return {
      connected: true,
      blockNumber: blockNumber,
      mode: 'production',
      message: 'Successfully connected to blockchain'
    };
  } catch (error) {
    return {
      connected: false,
      mode: 'production',
      error: error.message,
      message: 'Failed to connect to blockchain'
    };
  }
};

export default {
  verifyOnBlockchain,
  checkVerification,
  getContractStats,
  testBlockchainConnection,
  isDevelopment
};