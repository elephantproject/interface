import { useMemo } from 'react'
import { StakingInfo } from '../state/stake/hooks'

export default function useFilterStakingInfos(
  stakingInfos: StakingInfo[],
  isActive: boolean | undefined = undefined,
  onlyStaked: boolean | undefined = undefined
): StakingInfo[] {
  return useMemo(() => {
    if (isActive !== undefined) {
      stakingInfos = stakingInfos.filter(s => s.active === isActive)
    }

    if (onlyStaked !== undefined) {
      return stakingInfos
        .filter(s => s.earnedAmount.greaterThan('0'))
        .sort((a, b) => {
          if (a.earnedAmount === undefined || b.earnedAmount === undefined) {
            return 0
          }
          return b.earnedAmount.greaterThan(a.earnedAmount) ? 1 : -1
        })
    }

    return stakingInfos.sort((a, b) => {
      if (a.apr === undefined || b.apr === undefined) {
        return 0
      }
      return b.apr.greaterThan(a.apr) ? 1 : -1
    })
  }, [stakingInfos, isActive, onlyStaked])
}
