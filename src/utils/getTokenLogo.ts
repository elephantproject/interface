import { Blockchain } from '@elephantdefi/sdk'
import { BLOCKCHAIN } from '../connectors'
import bscdump from '../assets/images/elephant-token-logo.png'

export default function getTokenLogo(): string {
  switch (BLOCKCHAIN) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return bscdump
    case Blockchain.HARMONY:
      return bscdump
    default:
      return bscdump
  }
}
