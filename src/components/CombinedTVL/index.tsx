import React from 'react'
import { useStakingInfo } from '../../state/stake/hooks'
import { useActiveWeb3React } from '../../hooks'
import useTotalCombinedTVL from '../../hooks/useTotalCombinedTVL'
import { CustomMouseoverTooltip } from '../Tooltip/custom'
import { PIT_SETTINGS } from '../../constants'
import useFilterStakingInfos from '../../hooks/useFilterStakingInfos'

export default function CombinedTVL({}) {
  const { chainId } = useActiveWeb3React()
  const pitSettings = chainId ? PIT_SETTINGS[chainId] : undefined
  const isActive = true
  const filteredStakingInfos = useFilterStakingInfos(useStakingInfo(isActive), isActive)
  const TVLs = useTotalCombinedTVL(filteredStakingInfos)

  return (
    <>
      {TVLs?.stakingPoolTVL?.greaterThan('0') && (
        <CustomMouseoverTooltip
          element={
            <>
              {TVLs.stakingPoolTVL?.greaterThan('0') && (
                <>
                  <b>Staking:</b> $
                  {Math.round(
                    Number(
                      TVLs.stakingPoolTVL.toSignificant(12, {
                        groupSeparator: ','
                      }) * 1000000000000
                    )
                  )}
                  <br />
                </>
              )}
              {TVLs.totalPitTVL?.greaterThan('0') && (
                <>
                  <b>{pitSettings?.name}:</b> $
                  {Math.round(Number(TVLs.totalPitTVL.toSignificant(12, { groupSeparator: ',' }) * 1000000000000))}
                  <br />
                </>
              )}
              {TVLs.totalCombinedTVL?.greaterThan('0') && (
                <>
                  <b>Total:</b> $
                  {Math.round(Number(TVLs.totalCombinedTVL.toSignificant(12, { groupSeparator: ',' }) * 1000000000000))}
                </>
              )}
            </>
          }
        >
          {TVLs.totalCombinedTVL?.greaterThan('0') && (
            <>
              TVL: $
              {Math.round(Number(TVLs.totalCombinedTVL.toSignificant(12, { groupSeparator: ',' }) * 1000000000000))}
            </>
          )}
        </CustomMouseoverTooltip>
      )}
    </>
  )
}
