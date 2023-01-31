import { ChainId, Token } from 'elephantdexsdk'
import getPairTokensWithDefaults from '../utils/getPairTokensWithDefaults'

export const PIT_POOLS: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
  }[]
} = {
  [ChainId.HARMONY_MAINNET]: [
    {
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/ELEPHANT')
    },
    {
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'rOne/WONE')
    },
    {
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'MATIC/LINK')
    },
    {
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'USDC/WONE')
    },
    {
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BNB/WONE')
    },
    {
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ATOM/WONE')
    },
    {
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ETH/WONE')
    },
    {
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WBTC/ETH')
    },
    {
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ELEPHANT/USDC')
    },
    {
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/stONE')
    },
    {
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ELEPHANT/1USDC')
    }
  ],
  [ChainId.HARMONY_TESTNET]: [
    {
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/BUSD')
    }
  ],
  [ChainId.BSC_TESTNET]: []
}
