import { useMemo } from 'react'
import { Token, WETH, Price } from 'elephantdexsdk'
import { useActiveWeb3React } from './index'
import { usePair } from '../data/Reserves'

export default function useTokenWethPrice(token: Token | undefined): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const [, tokenWETHPair] = usePair(chainId && WETH[chainId], token)

  return useMemo(() => {
    return token && chainId && tokenWETHPair ? tokenWETHPair.priceOf(token) : undefined
  }, [chainId, token, tokenWETHPair])
}
