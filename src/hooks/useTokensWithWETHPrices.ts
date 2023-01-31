import { WETH, Token } from 'elephantdexsdk'
import { useMemo } from 'react'
import useGovernanceToken from './useGovernanceToken'
import useTokenWethPrice from './useTokenWETHPrice'
import useBlockchain from './useBlockchain'
import getToken from '../utils/getToken'
import { useActiveWeb3React } from './index'

export default function useTokensWithWethPrices(): Record<string, any> {
  const { chainId } = useActiveWeb3React()
  const blockchain = useBlockchain()

  const weth = chainId && WETH[chainId]

  const govToken = useGovernanceToken()
  const govTokenWETHPrice = useTokenWethPrice(govToken)

  const USDCTicker = 'USDC'
  const USDC: Token | undefined = getToken(chainId, USDCTicker)
  const USDCWETHPrice = useTokenWethPrice(USDC)

  // Harmony specific tokens

  const bridgedETH: Token | undefined = getToken(chainId, 'ETH')
  const bridgedETHWETHPrice = useTokenWethPrice(bridgedETH)

  const bridgedMATIC: Token | undefined = getToken(chainId, 'MATIC')
  const bridgedMATICWETHPrice = useTokenWethPrice(bridgedMATIC)

  const bridgedLINK: Token | undefined = getToken(chainId, 'LINK')
  const bridgedLINKWETHPrice = useTokenWethPrice(bridgedLINK)

  const bridgedDAI: Token | undefined = getToken(chainId, 'bscDAI')
  const bridgedDAIWETHPrice = useTokenWethPrice(bridgedDAI)

  const bridgedBNB: Token | undefined = getToken(chainId, 'BNB')
  const bridgedBNBWETHPrice = useTokenWethPrice(bridgedBNB)

  const bridgedATOM: Token | undefined = getToken(chainId, 'ATOM')
  const bridgedATOMWETHPrice = useTokenWethPrice(bridgedATOM)

  return useMemo(() => {
    return {
      WETH: { token: weth, price: undefined },
      govToken: { token: govToken, price: govTokenWETHPrice },
      USDC: { token: USDC, price: USDCWETHPrice },
      bridgedETH: { token: bridgedETH, price: bridgedETHWETHPrice },
      bridgedMATIC: { token: bridgedMATIC, price: bridgedMATICWETHPrice },
      bridgedLINK: { token: bridgedLINK, price: bridgedLINKWETHPrice },
      bridgedDAI: { token: bridgedDAI, price: bridgedDAIWETHPrice },
      bridgedBNB: { token: bridgedBNB, price: bridgedBNBWETHPrice },
      bridgedATOM: { token: bridgedATOM, price: bridgedATOMWETHPrice }
    }
  }, [
    chainId,
    blockchain,
    weth,
    govToken,
    govTokenWETHPrice,
    USDC,
    USDCWETHPrice,
    bridgedETH,
    bridgedETHWETHPrice,
    bridgedLINKWETHPrice,
    bridgedMATICWETHPrice,
    bridgedATOMWETHPrice,
    bridgedBNBWETHPrice
  ])
}
