import { TRANSACTION_ID_PLACEHOLDER } from './api';
import { SupportedChains } from './supported-chains';

export interface IBlockchainObject {
  code: SupportedChains;
  name: string;
  prefixes?: string[];
  test?: boolean;
  signatureValue: string;
  transactionTemplates: {
    full: string;
    raw: string;
    vanity: string;
  };
}

const BLOCKCHAINS: { [chain in SupportedChains]: IBlockchainObject } = {
  [SupportedChains.Bitcoin]: {
    code: SupportedChains.Bitcoin,
    name: 'Bitcoin',
    prefixes: ['6a20', 'OP_RETURN '],
    signatureValue: 'bitcoinMainnet',
    transactionTemplates: {
      full: `https://blockchain.info/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://blockchain.info/rawtx/${TRANSACTION_ID_PLACEHOLDER}`,
      vanity: ''
    }
  },
  [SupportedChains.Ethmain]: {
    code: SupportedChains.Ethmain,
    name: 'Ethereum',
    prefixes: ['0x'],
    signatureValue: 'ethereumMainnet',
    transactionTemplates: {
      full: `https://etherscan.io/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://etherscan.io/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      vanity: ''
    }
  },
  [SupportedChains.Ethropst]: {
    code: SupportedChains.Ethropst,
    name: 'Ethereum Testnet',
    signatureValue: 'ethereumRopsten',
    transactionTemplates: {
      full: `https://ropsten.etherscan.io/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://ropsten.etherscan.io/getRawTx?tx=${TRANSACTION_ID_PLACEHOLDER}`,
      vanity: ''
    }
  },
  [SupportedChains.Ethrinkeby]: {
    code: SupportedChains.Ethrinkeby,
    name: 'Ethereum Testnet',
    signatureValue: 'ethereumRinkeby',
    transactionTemplates: {
      full: `https://rinkeby.etherscan.io/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://rinkeby.etherscan.io/getRawTx?tx=${TRANSACTION_ID_PLACEHOLDER}`,
      vanity: ''
    }
  },
  [SupportedChains.Mocknet]: {
    code: SupportedChains.Mocknet,
    name: 'Mocknet',
    test: true,
    signatureValue: 'mockchain',
    transactionTemplates: {
      full: '',
      raw: '',
      vanity: ''
    }
  },
  [SupportedChains.Regtest]: {
    code: SupportedChains.Regtest,
    name: 'Mocknet',
    test: true,
    signatureValue: 'bitcoinRegtest',
    transactionTemplates: {
      full: '',
      raw: '',
      vanity: ''
    }
  },
  [SupportedChains.Testnet]: {
    code: SupportedChains.Testnet,
    name: 'Bitcoin Testnet',
    signatureValue: 'bitcoinTestnet',
    transactionTemplates: {
      full: `https://testnet.blockchain.info/tx/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://testnet.blockchain.info/rawtx/${TRANSACTION_ID_PLACEHOLDER}`,
      vanity: ''
    }
  },
  [SupportedChains.Exos]: {
    code: SupportedChains.Exos,
    name: 'Exos Mainnet',
    prefixes: ['6a20', 'OP_RETURN '],
    signatureValue: 'EXOSMainnet',
    transactionTemplates: {
      full: `https://core.chertero.com/exos/api/query/transaction/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://core.chertero.com/exos/api/query/transaction/${TRANSACTION_ID_PLACEHOLDER}`,
      vanity: `https://explorer.chertero.com/exos/explorer/transaction/${TRANSACTION_ID_PLACEHOLDER}`
    }
  },
  [SupportedChains.Rutanio]: {
    code: SupportedChains.Rutanio,
    name: 'Rutanio Mainnet',
    prefixes: ['6a20', 'OP_RETURN '],
    signatureValue: 'RUTAMainnet',
    transactionTemplates: {
      full: `https://core.chertero.com/ruta/api/query/transaction/${TRANSACTION_ID_PLACEHOLDER}`,
      raw: `https://core.chertero.com/ruta/api/query/transaction/${TRANSACTION_ID_PLACEHOLDER}`,
      vanity: `https://explorer.chertero.com/ruta/explorer/transaction/${TRANSACTION_ID_PLACEHOLDER}`
    }
  }
};

// TODO: use test boolean from entry?
function isTestChain (chain: SupportedChains): boolean {
  return chain !== BLOCKCHAINS.bitcoin.code && chain !== BLOCKCHAINS.ethmain.code;
}

export {
  BLOCKCHAINS,
  isTestChain
};
