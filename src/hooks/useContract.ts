import { Contract } from '@ethersproject/contracts'
import { abi as GOVERNANCE_TOKEN_ABI } from 'elephantdexcontracts/build/GovernanceToken.json'
import { abi as MASTER_BREEDER_ABI } from 'elephantdexcontracts/build/MasterBreeder.json'
import { abi as PIT_ABI } from 'elephantdexcontracts/build/Pit.json'
import { abi as PIT_BREEDER_ABI } from 'elephantdexcontracts/build/PitBreeder.json'
import { WETH } from 'elephantdexsdk'
import { abi as IUniswapV2PairABI } from 'elephantdexcore/build/IUniswapV2Pair.json'
import { useMemo } from 'react'
import { MASTER_BREEDER, PIT, PIT_BREEDER, MASTERBANK, NFT0ADDRESS } from '../constants'

import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
import WETH_ABI from '../constants/abis/weth.json'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'
import { getContract } from '../utils'
import { useActiveWeb3React } from './index'
import useGovernanceToken from './useGovernanceToken'

import { abi as MB_ABI } from 'elephantdexcontracts/build/MasterBank.json'

import { abi as NFTABI } from 'elephantdexnftcontracts/build/NFT.json'

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}

export function useMasterBankContract(): Contract | null {
  return useContract(MASTERBANK, MB_ABI, true)
}

export function useGovTokenContract(): Contract | null {
  return useContract(useGovernanceToken()?.address, GOVERNANCE_TOKEN_ABI, true)
}

export function usePitContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? PIT[chainId].address : undefined, PIT_ABI, withSignerIfPossible)
}

export function usePitBreederContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? PIT_BREEDER[chainId] : undefined, PIT_BREEDER_ABI, withSignerIfPossible)
}

export function useMasterBreederContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  const address = chainId && MASTER_BREEDER[chainId]
  return useContract(address, MASTER_BREEDER_ABI, withSignerIfPossible)
}

export function useNFT0(): Contract | null {
  return useContract(NFT0ADDRESS, NFTABI, true)
}
