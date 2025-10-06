// Web3 utility functions for blockchain integration
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return accounts[0];
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      throw error;
    }
  } else {
    throw new Error('MetaMask not installed');
  }
};

export const getCurrentAccount = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    return accounts[0] || null;
  }
  return null;
};

export const verifyProductOnBlockchain = async (productId, productData) => {
  // This would interact with your smart contract
  // For now, return a mock transaction hash
  return {
    transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
    blockNumber: Math.floor(Math.random() * 10000),
    timestamp: Date.now()
  };
};

export const checkProductVerification = async (productId) => {
  // Mock verification check
  return {
    verified: true,
    verifiedBy: '0x742d35Cc6634C0532925a3b8D...',
    verificationDate: '2024-01-20',
    transactionHash: '0x' + Math.random().toString(16).substr(2, 64)
  };
};