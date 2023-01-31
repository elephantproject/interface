import { ChainId, Token } from 'elephantdexsdk'
import getPairTokensWithDefaults from '../utils/getPairTokensWithDefaults'

export interface StakingRewardsInfo {
  pid: number
  tokens: [Token, Token]
  active: boolean
}

export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: StakingRewardsInfo[]
} = {
  [ChainId.HARMONY_MAINNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1USDC'),
      active: false
    },
    {
      pid: 1,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/ELEPHANT'),
      active: true
    },
    {
      pid: 2,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'xELEPHANT/ELEPHANT'),
      active: true
    },

    {
      pid: 4,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1WBTC'),
      active: false
    },
    {
      pid: 5,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/bscADA'),
      active: false
    },
    {
      pid: 7,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'SUSHI/ELEPHANT'),
      active: false
    },
    {
      pid: 8,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'MATIC/ELEPHANT'),
      active: false
    },
    {
      pid: 9,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'LINK/ELEPHANT'),
      active: false
    },
    {
      pid: 10,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1USDC/ELEPHANT'),
      active: false
    },
    {
      pid: 11,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'VIPER/ELEPHANT'),
      active: false
    },
    {
      pid: 12,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JEWEL/ELEPHANT'),
      active: false
    },
    {
      pid: 13,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'SONIC/ELEPHANT'),
      active: false
    },
    {
      pid: 14,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'rOne/WONE'),
      active: true
    },
    {
      pid: 15,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'rOne/ELEPHANT'),
      active: true
    },
    {
      pid: 17,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WBTC/WONE'),
      active: true
    },
    {
      pid: 18,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ETH/WONE'),
      active: true
    },
    {
      pid: 19,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WBTC/ETH'),
      active: true
    },
    {
      pid: 20,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'LINK/MATIC'),
      active: true
    },
    {
      pid: 22,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ATOM/BNB'),
      active: true
    },
    {
      pid: 23,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ATOM/WONE'),
      active: true
    },
    {
      pid: 24,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BNB/WONE'),
      active: true
    }
  ]
}
