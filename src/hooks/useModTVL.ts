import { useMemo } from 'react'
import { Fraction, JSBI } from 'elephantdexsdk'
import { StakingInfo } from '../state/stake/hooks'

export default function useModTVL(stakingInfos: StakingInfo[]): Fraction {
  return useMemo(() => {
    return stakingInfos.reduce<Fraction>((memo, stakingInfo) => {
      if (stakingInfo && stakingInfo.valueOfTotalStakedAmountInUsd) {
        console.log(stakingInfo)
        if (stakingInfo.valueOfTotalStakedAmountInUsd && stakingInfo.pid != 6) {
          memo = memo.add(stakingInfo.valueOfTotalStakedAmountInUsd)
        }
      }
      return memo
    }, new Fraction(JSBI.BigInt(0), JSBI.BigInt(1)))
  }, [stakingInfos])
}
