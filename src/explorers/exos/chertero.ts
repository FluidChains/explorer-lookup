import { stripHashPrefix } from '../../utils/stripHashPrefix';
import { timestampToDateObject } from '../../utils/date';
import { ExplorerAPI, ExplorerURLs, IParsingFunctionAPI } from '../../models/explorers';
import { TransactionData } from '../../models/transactionData';
import { TRANSACTION_APIS, TRANSACTION_ID_PLACEHOLDER } from '../../constants/api';
import CONFIG from '../../constants/config';
import { BLOCKCHAINS } from '../../constants/blockchains';

// TODO: use tests/explorers/mocks/mockBlockcypher as type
function parsingFunction ({ jsonResponse }: IParsingFunctionAPI): TransactionData {
  if (jsonResponse.confirmations < CONFIG.MininumConfirmations) {
    throw new Error('Number of transaction confirmations were less than the minimum required, according to Blockcypher API');
  }
  const time: Date = timestampToDateObject(jsonResponse.timestamp);
  const outputs = jsonResponse.outputs;
  let lastOutput = null;
  for (let i = 0, l = outputs.length; i < l; i++) {
    if (outputs[i].scriptPubKeyAsm.includes('OP_RETURN')) {
      lastOutput = outputs[i];
    }
  }
  const issuingAddress: string = jsonResponse.inputs[0].inputAddress;
  const remoteHash: string = stripHashPrefix(lastOutput.scriptPubKeyAsm, BLOCKCHAINS.exos.prefixes);
  const revokedAddresses: string[] = jsonResponse.outputs
    .filter(output => !!output.address)
    .map(output => output.address);
  return {
    remoteHash,
    issuingAddress,
    time,
    revokedAddresses
  };
}

const serviceURL: ExplorerURLs = {
  main: `https://core.chertero.com/exos/api/query/transaction/${TRANSACTION_ID_PLACEHOLDER}`,
  test: `https://core.chertero.com/exos/api/query/transaction/${TRANSACTION_ID_PLACEHOLDER}`
};

export const explorerApi: ExplorerAPI = {
  serviceURL,
  serviceName: TRANSACTION_APIS.cherteroexos,
  parsingFunction,
  priority: -1
};
