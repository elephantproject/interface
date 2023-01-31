import { ChainId, Currency, HARMONY, WETH } from 'elephantdexsdk'
import { NETWORK_CHAIN_ID } from '../connectors'

export default function baseCurrencies(chainId: ChainId | undefined): Currency[] {
  const currencies: Currency[] = []

  if (chainId) {
    currencies.push(HARMONY)
    currencies.push(WETH[chainId])
  } else {
    currencies.push(HARMONY)
    currencies.push(WETH[NETWORK_CHAIN_ID as ChainId])
  }

  return currencies
}
