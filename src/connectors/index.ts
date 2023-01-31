import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'

import { NetworkConnector } from './NetworkConnector'

import { Blockchain, Currency } from 'elephantdexsdk'

import baseCurrencies from '../utils/baseCurrencies'
import getBlockchain from '../utils/getBlockchain'

export const NETWORK_URL = process.env.REACT_APP_NETWORK_URL
export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL }
})

const generatedBaseCurrencies = baseCurrencies(NETWORK_CHAIN_ID)
export const BASE_CURRENCY: Currency = generatedBaseCurrencies[0]
export const BASE_WRAPPED_CURRENCY: Currency = generatedBaseCurrencies[1]

export const BLOCKCHAIN: Blockchain = getBlockchain(NETWORK_CHAIN_ID)

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

let supportedChainIds: number[]
switch (BLOCKCHAIN) {
  case Blockchain.BINANCE_SMART_CHAIN:
    supportedChainIds = [56, 97]
    break
  case Blockchain.HARMONY:
    supportedChainIds = [1666600000, 1666700000]
    break
  default:
    supportedChainIds = [1, 3, 4, 5, 42, 1666600000, 1666700000]
    break
}

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIds
})
