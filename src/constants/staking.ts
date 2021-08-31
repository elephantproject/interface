import { ChainId, Token } from '@elephantdefi/sdk'
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
      active: true
    }
    // {
    //   pid: 1,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'ELEPHANT/WONE'),
    //   active: true
    // }
    // {
    //   pid: 2,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'LINK/WONE'),
    //   active: true
    // }
    // {
    //   pid: 3,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BUSD/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 4,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'BUSD/bscBUSD'),
    //   active: true
    // },
    // {
    //   pid: 5,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1USDC'),
    //   active: true
    // },
    // {
    //   pid: 6,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1ROT/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 7,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1MAGGOT/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 8,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1WISE/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 9,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1DSLA/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 10,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'LINK/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 11,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1AAVE/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 12,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1SNX/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 13,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1YFI/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 14,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '11INCH/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 15,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'bscCAKE/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 16,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1SUSHI/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 17,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1UNI/VIPER'),
    //   active: true
    // },
    // {
    //   pid: 18,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, '1WISE/1ETH'),
    //   active: true
    // },
    // {
    //   pid: 19,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1WBTC'),
    //   active: true
    // },
    // {
    //   pid: 20,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'WONE/1MATIC'),
    //   active: true
    // },
    // {
    //   pid: 21,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_MAINNET, 'JENN/VIPER'),
    //   active: true
    // }
  ],
  [ChainId.HARMONY_TESTNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/1BUSD'),
      active: true
    },
    {
      pid: 1,
      tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'VIPER/WBTC'),
      active: true
    }
    // {
    //   pid: 3,
    //   tokens: getPairTokensWithDefaults(ChainId.HARMONY_TESTNET, 'WONE/ELEPHANT'),
    //   active: true
    // }
  ],
  [ChainId.BSC_TESTNET]: [
    {
      pid: 0,
      tokens: getPairTokensWithDefaults(ChainId.BSC_TESTNET, 'WBNB/BUSD'),
      active: true
    },
    {
      pid: 1,
      tokens: getPairTokensWithDefaults(ChainId.BSC_TESTNET, 'WBNB/COBRA'),
      active: true
    }
  ]
}
