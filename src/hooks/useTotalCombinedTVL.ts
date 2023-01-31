import { useMemo } from 'react'
import { StakingInfo } from '../state/stake/hooks'
import usePitTVL from './usePitTVL'
import useModTVL from './useModTVL'

export default function useTotalCombinedTVL(stakingInfos: StakingInfo[]): Record<string, any> {
  // const totalStakingPoolTVL = useTotalTVL(stakingInfos)

  const totalStakingPoolTVLMod = useModTVL(stakingInfos)

  const totalPitTVL = usePitTVL()

  return useMemo(() => {
    return {
      stakingPoolTVL: totalStakingPoolTVLMod ? totalStakingPoolTVLMod : undefined,
      totalPitTVL: totalPitTVL ? totalPitTVL : undefined,
      totalCombinedTVL: totalStakingPoolTVLMod && totalPitTVL ? totalStakingPoolTVLMod.add(totalPitTVL) : undefined
    }
  }, [stakingInfos, totalStakingPoolTVLMod, totalPitTVL])
}
