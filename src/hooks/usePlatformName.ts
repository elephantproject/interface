import { Blockchain } from 'elephantdexsdk'
import useBlockchain from './useBlockchain'

export default function usePlatformName(): string {
  const blockchain = useBlockchain()
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return 'Null'
    case Blockchain.HARMONY:
      return 'Elephant Dex - Harmony Liquidity Provider | elephant.ac'
    case Blockchain.ETHEREUM:
      return 'Elephant Dex - Harmony Liquidity Provider | elephant.ac'
    default:
      return 'Elephant Dex - Harmony Liquidity Provider | elephant.ac'
  }
}
