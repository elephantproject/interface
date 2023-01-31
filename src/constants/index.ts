import { ChainId, JSBI, Percent, Token, WETH } from 'elephantdexsdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected } from '../connectors'

import getTokenWithDefault from '../utils/getTokenWithDefault'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const ZERO_ONE_ADDRESS = '0x0000000000000000000000000000000000000002'

export const USDC = new Token(
  ChainId.HARMONY_MAINNET,
  '0xBC594CABd205bD993e7FfA6F3e9ceA75c1110da5',
  18,
  'USDC',
  'US Dollar Coin'
)

export const MASTERBANK = '0xc979e12af0b50F65c07aF660719Fe4Aed870096B'

// this is a step in manual

export const NFT0ADDRESS = '0x348a02E332C4245bEd8311f2C9F0248b6B831b47'

// change this later nftwise

export const ROUTER_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.HARMONY_MAINNET]: '0x9B5747c6C7e29Aab9545233D6310FC6db1e11F70',
  [ChainId.HARMONY_TESTNET]: '0xc540039dD671dE978E115814Bf14104AeaBdfb09'
}

export const GOVERNANCE_TOKEN: { [chainId in ChainId]: Token } = {
  [ChainId.HARMONY_MAINNET]: new Token(
    ChainId.HARMONY_MAINNET,
    '0xc30a7f9c216b945ff8acfb389e955a637eb0f478',
    18,
    'ELEPHANT',
    'Elephant'
  ),
  [ChainId.HARMONY_TESTNET]: new Token(
    ChainId.HARMONY_TESTNET,
    '0x3084F5DfB0063087A3e28d280c73eC22adcC3a96',
    18,
    'ELEPHANT',
    'Elephant'
  )
}

export const MASTER_BREEDER: { [chainId in ChainId]: string } = {
  [ChainId.HARMONY_MAINNET]: '0x515dDC1B67403B83c8a28552E2762d5898A341C3',
  [ChainId.HARMONY_TESTNET]: '0xb92cf62Aa5d64d651e124c3C87E3072DBA5dF66B'
}

export const PIT_BREEDER: { [chainId in ChainId]: string } = {
  [ChainId.HARMONY_MAINNET]: '0x3773bB667C1e4948C08B5Fbba1231BAe3B1589D4',
  [ChainId.HARMONY_TESTNET]: '0x7706B42b2c6030BA08d6Df8bD71E85C8c72e7bDb'
}

export const PIT: { [chainId in ChainId]: Token } = {
  [ChainId.HARMONY_MAINNET]: new Token(
    ChainId.HARMONY_MAINNET,
    '0xf4E99513b2d31AE0b9080ff18D480EA9ED03084A',
    18,
    'xElephant',
    'ElephantPit'
  ),
  [ChainId.HARMONY_TESTNET]: new Token(
    ChainId.HARMONY_TESTNET,
    '0xD1D4192BC27c193Ffe67909f36F95e480aC6490A',
    18,
    'xElephant',
    'ElephantPit'
  )
}

export const PIT_SETTINGS: { [chainId in ChainId]: Record<string, string> } = {
  [ChainId.HARMONY_MAINNET]: { name: 'ElephantPit', path: '/elephantPit' },
  [ChainId.HARMONY_TESTNET]: { name: 'ElephantPit', path: '/elephantPit' }
}

export const WEB_INTERFACES: { [chainId in ChainId]: string[] } = {
  [ChainId.HARMONY_MAINNET]: ['http://elephant.ac'],
  [ChainId.HARMONY_TESTNET]: ['http://elephant.ac']
}

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time

const WETH_ONLY: ChainTokenList = {
  [ChainId.HARMONY_MAINNET]: [WETH[ChainId.HARMONY_MAINNET]],
  [ChainId.HARMONY_TESTNET]: [WETH[ChainId.HARMONY_TESTNET]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.HARMONY_MAINNET]: [
    ...WETH_ONLY[ChainId.HARMONY_MAINNET],
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'USDC'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'ELEPHANT'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'ETH'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WBTC')
  ]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.HARMONY_MAINNET]: [
    ...WETH_ONLY[ChainId.HARMONY_MAINNET],
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'USDC'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'ELEPHANT'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'rOne'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'ETH'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WBTC')
  ]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.HARMONY_MAINNET]: [
    ...WETH_ONLY[ChainId.HARMONY_MAINNET],
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'USDC'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'ELEPHANT'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'ETH'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'WBTC'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'MATIC'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'LINK'),
    getTokenWithDefault(ChainId.HARMONY_MAINNET, 'rOne')
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = ['']
