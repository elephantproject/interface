import { ChainId } from '@elephantdefi/sdk'
import { BLOCKCHAIN_SETTINGS } from '@elephantdefi/sdk-extra'

export default function getNetworkSettings(chainId: ChainId, rpcUrls?: string[]): Record<string, any> {
  const settings = BLOCKCHAIN_SETTINGS[chainId]

  return {
    chainId: settings.hexChainId(),
    chainName: settings.name,
    nativeCurrency: {
      name: settings.currency?.name,
      symbol: settings.currency?.symbol,
      decimals: settings.currency?.decimals
    },
    rpcUrls: rpcUrls ? rpcUrls : settings.rpcURLs,
    blockExplorerUrls: [settings.explorerURL]
  }
}
