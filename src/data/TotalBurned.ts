import { BigNumber } from '@ethersproject/bignumber'
import { Token, TokenAmount } from 'elephantdexsdk'
import { useTokenContract, useGovTokenContract } from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import useGovernanceToken from '../hooks/useGovernanceToken'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useTotalSupply(token?: Token): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const totalBurned: BigNumber = useSingleCallResult(contract, 'totalBalanceOf')?.result?.[0]

  return token && totalBurned ? new TokenAmount(token, totalBurned.toString()) : undefined
}

export function useGovTokenSupply(method = 'totalBalanceOf'): TokenAmount | undefined {
  const contract = useGovTokenContract()
  const value: BigNumber = useSingleCallResult(contract, method)?.result?.[0]
  const token = useGovernanceToken()
  return token && value ? new TokenAmount(token, value.toString()) : undefined
}
