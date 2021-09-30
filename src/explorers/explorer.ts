import { buildTransactionServiceUrl } from '../services/transaction-apis';
import { request } from '../services/request';
import { isTestChain } from '../constants/blockchains';
import { TransactionData } from '../models/transactionData';
import { ExplorerAPI, TExplorerFunctionsArray } from '../models/explorers';
import { explorerApi as EtherscanApi } from './ethereum/etherscan';
import { explorerApi as BlockCypherETHApi } from './ethereum/blockcypher';
import { explorerApi as BlockstreamApi } from './bitcoin/blockstream';
import { explorerApi as BlockCypherBTCApi } from './bitcoin/blockcypher';
import { explorerApi as BlockcoreEXOSApi } from './exos/blockexplorerexos';
import { explorerApi as CherteroEXOSApi } from './exos/chertero';
import { explorerApi as BlockcoreRUTAApi } from './rutanio/blockexplorerrutanio';
import { explorerApi as CherteroRUTAApi } from './rutanio/chertero';
import { SupportedChains } from '../constants/supported-chains';

export function explorerFactory (TransactionAPIArray: ExplorerAPI[]): TExplorerFunctionsArray {
  return TransactionAPIArray
    .map(explorerAPI => (
      {
        getTxData: async (transactionId, chain) => await getTransactionFromApi(explorerAPI, transactionId, chain),
        priority: explorerAPI.priority
      }
    ));
}

export async function getTransactionFromApi (
  explorerAPI: ExplorerAPI,
  transactionId: string,
  chain: SupportedChains
): Promise<TransactionData> {
  const requestUrl = buildTransactionServiceUrl({
    explorerAPI,
    transactionId,
    isTestApi: isTestChain(chain)
  });

  try {
    const response = await request({ url: requestUrl });
    return await explorerAPI.parsingFunction({
      jsonResponse: JSON.parse(response),
      chain,
      ...explorerAPI
    });
  } catch (err) {
    throw new Error('Unable to get remote hash');
  }
}

const BitcoinTransactionAPIArray = [
  BlockCypherBTCApi,
  BlockstreamApi
];

const EthereumTransactionAPIArray = [
  EtherscanApi,
  BlockCypherETHApi
];

const ExosTransactionAPIArray = [
  BlockcoreEXOSApi,
  CherteroEXOSApi
];

const RutanioTransactionAPIArray = [
  BlockcoreRUTAApi,
  CherteroRUTAApi
];

const BlockchainExplorersWithSpentOutputInfo = [
  BlockCypherBTCApi
];

export {
  BitcoinTransactionAPIArray,
  EthereumTransactionAPIArray,
  ExosTransactionAPIArray,
  RutanioTransactionAPIArray,
  BlockchainExplorersWithSpentOutputInfo
};
