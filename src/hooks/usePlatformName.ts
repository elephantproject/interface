import { Blockchain } from '@elephantdefi/sdk'
import useBlockchain from './useBlockchain'

export default function usePlatformName(): string {
  const blockchain = useBlockchain()
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return 'Cobraswap'
    case Blockchain.HARMONY:
      return 'Elephant Exchange'
    case Blockchain.ETHEREUM:
      return 'Elephant'
    default:
      return 'Elephant'
  }
}
