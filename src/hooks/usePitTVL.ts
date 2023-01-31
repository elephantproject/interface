import { useMemo } from 'react'
import { TokenAmount } from 'elephantdexsdk'
import { useTokenBalance } from '../state/wallet/hooks'
import usePitToken from './usePitToken'
import { GOVERNANCE_TOKEN_INTERFACE } from '../constants/abis/governanceToken'
import useGovernanceToken from 'hooks/useGovernanceToken'
import useUSDPrice from './useUSDPrice'

export default function usePit() {
  const govToken = useGovernanceToken()
  const govTokenBusdPrice = useUSDPrice(govToken)
  const pit = usePitToken()
  const pitGovTokenBalance: TokenAmount | undefined = useTokenBalance(
    pit && pit.address,
    govToken,
    'balanceOf',
    GOVERNANCE_TOKEN_INTERFACE
  )

  return useMemo(() => {
    return govTokenBusdPrice ? pitGovTokenBalance?.multiply(govTokenBusdPrice?.raw) : undefined
  }, [govToken, govTokenBusdPrice, pit, pitGovTokenBalance])
}
