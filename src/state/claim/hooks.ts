import { TokenAmount, JSBI } from 'elephantdexsdk'
import { useState } from 'react'
import { useActiveWeb3React } from '../../hooks'
import useGovernanceToken from '../../hooks/useGovernanceToken'

interface UserClaimData {
  index: number
  amount: string
  flags?: {
    isLP: boolean
    isUser: boolean
  }
}

// parse distributorContract blob and detect if user has claim data
// null means we know it does not
export function useUserClaimData(account: string | null | undefined): UserClaimData | null | undefined {
  const { chainId } = useActiveWeb3React()

  const key = `${chainId}:${account}`
  const [claimInfo] = useState<{ [key: string]: UserClaimData | null }>({})

  return account && chainId ? claimInfo[key] : undefined
}

// check if user is in blob and has not yet claimed UNI
export function useUserHasAvailableClaim(account: string | null | undefined): boolean {
  const userClaimData = useUserClaimData(account)
  // user is in blob and contract marks as unclaimed
  return Boolean(userClaimData)
}

export function useUserUnclaimedAmount(account: string | null | undefined): TokenAmount | undefined {
  const userClaimData = useUserClaimData(account)
  const canClaim = useUserHasAvailableClaim(account)

  const govToken = useGovernanceToken()
  if (!govToken) return undefined
  if (!canClaim || !userClaimData) {
    return new TokenAmount(govToken, JSBI.BigInt(0))
  }
  return new TokenAmount(govToken, JSBI.BigInt(userClaimData.amount))
}
