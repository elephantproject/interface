import { ChainId, Token } from 'elephantdexsdk'
import getPairTokensWithDefaults from '../utils/getPairTokensWithDefaults'

export const PIT_POOLS: {
  [chainId in ChainId]?: {
    pid: number
    tokens: [Token, Token]
  }[]
} = {
  [ChainId.HARMONY_MAINNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1USDC')
    },
    {
      pid: 1,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/ELEPHANT')
    },
    {
      pid: 3,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1ETH')
    },
    {
      pid: 4,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1WBTC')
    },
    {
      pid: 5,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/bscADA')
    },
    {
      pid: 6,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'UST/1USDC')
    },
    {
      pid: 7,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1SUSHI/ELEPHANT')
    },
    {
      pid: 8,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1MATIC/ELEPHANT')
    },
    {
      pid: 9,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1LINK/ELEPHANT')
    },
    {
      pid: 10,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1USDC/ELEPHANT')
    }
  ],
  [ChainId.HARMONY_TESTNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/BUSD')
    }
  ],
  [ChainId.BSC_TESTNET]: []
}
