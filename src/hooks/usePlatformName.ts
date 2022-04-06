import { Blockchain } from 'elephantdexsdk'
import useBlockchain from './useBlockchain'

import useBUSDPrice from 'hooks/useBUSDPrice'
import useGovernanceToken from 'hooks/useGovernanceToken'

export default function usePlatformName(): string {
  const govToken = useGovernanceToken()
  const govprice = useBUSDPrice(govToken)

  const blockchain = useBlockchain()
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return 'Elephant Swap - HRC20 Exchange | Harmony Yield Farming | Defi & Casino | elephant.ac'
    case Blockchain.HARMONY:
      return govprice
        ? '$' + govToken?.name + ' - $' + govprice?.toFixed(3) + ' Trade HRC20 Tokens On Elephant.ac'
        : 'Elephant Swap - HRC20 Exchange | Harmony Yield Farming | Defi & Casino | elephant.ac'
    case Blockchain.ETHEREUM:
      return 'Elephant Swap - HRC20 Exchange | Harmony Yield Farming | Defi & Casino | elephant.ac'
    default:
      return 'Elephant Swap - HRC20 Exchange | Harmony Yield Farming | Defi & Casino | elephant.ac'
  }
}
