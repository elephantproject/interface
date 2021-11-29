import { Blockchain } from 'elephantdexsdk'
import useBlockchain from './useBlockchain'

import useBUSDPrice from 'hooks/useBUSDPrice'
import useGovernanceToken from 'hooks/useGovernanceToken'

export default function usePlatformName(): string {
  const govToken = useGovernanceToken()
  const govprice = useBUSDPrice(govToken)

  console.log(govToken)

  const blockchain = useBlockchain()
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return 'Please switch to the Harmony network'
    case Blockchain.HARMONY:
      return '$' + govToken?.name + ' - $' + govprice?.toFixed(3) + ' Trade HRC20 Tokens On Elephant.ac'
    case Blockchain.ETHEREUM:
      return 'Please switch to the Harmony network'
    default:
      return 'Elephant Dex - Harmony Defi & Casino | elephant.ac'
  }
}
