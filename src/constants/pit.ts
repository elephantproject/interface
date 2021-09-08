import { ChainId, Token } from '@elephantdefi/sdk'
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
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/BUSD')
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
