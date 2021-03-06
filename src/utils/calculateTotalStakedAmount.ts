import { Token, TokenAmount, Pair, JSBI } from 'elephantdexsdk'

export default function calculateTotalStakedAmount(
  baseToken: Token,
  TokenPair: Pair,
  totalStakedAmount: TokenAmount,
  totalLpTokenSupply: TokenAmount
): TokenAmount {
  // take the total amount of LP , multiply by ETH value of all LP tokens, divide by all LP tokens
  return new TokenAmount(
    baseToken,
    JSBI.divide(
      JSBI.multiply(
        JSBI.multiply(totalStakedAmount.raw, TokenPair.reserveOf(baseToken).raw),
        JSBI.BigInt(2) // this is b/c the value of LP shares are ~double the value of the WETH they entitle owner to
      ),
      totalLpTokenSupply.raw
    )
  )
}
