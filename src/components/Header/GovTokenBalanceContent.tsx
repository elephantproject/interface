import { TokenAmount, Blockchain } from 'elephantdexsdk'
import React from 'react'
//import React, { useMemo } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import getTokenLogo from '../../utils/getTokenLogo'
import { useGovTokenSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
//import { useMerkleDistributorContract } from '../../hooks/useContract'
//import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp'

import { useTotalLockedGovTokensEarned, useTotalUnlockedGovTokensEarned } from '../../state/stake/hooks'
import { useAggregateGovTokenBalance, useTokenBalance } from '../../state/wallet/hooks'
import { StyledInternalLink, TYPE, UniTokenAnimated } from '../../theme'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'
import useGovernanceToken from '../../hooks/useGovernanceToken'
import { GOVERNANCE_TOKEN_INTERFACE } from '../../constants/abis/governanceToken'
import { MouseoverTooltip } from '../Tooltip'

import useUSDPrice from 'hooks/useUSDPrice'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  background: radial-gradient(
    86.02% 85.41% at 5.84% 0%,
    ${({ theme }) => theme.tokenButtonGradientStart} 0%,
    #000 100%
  );
  padding: 0.9rem;
`

const StyledClose = styled(X)`
  margin-left: auto;
  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function GovTokenBalanceContent({ setShowUniBalanceModal }: { setShowUniBalanceModal: any }) {
  const { account } = useActiveWeb3React()
  const govToken = useGovernanceToken()
  const total = useAggregateGovTokenBalance()

  const totalburned: TokenAmount | undefined = useTokenBalance(
    '0x7bdef7bdef7bdef7bdef7bdef7bdef7bdef6e7ad',
    govToken,
    'balanceOf',
    GOVERNANCE_TOKEN_INTERFACE
  )

  const govTokenLockedBalance: TokenAmount | undefined = useTokenBalance(
    account ?? undefined,
    govToken,
    'lockOf',
    GOVERNANCE_TOKEN_INTERFACE
  )
  const govTokenTotalBalance: TokenAmount | undefined = useTokenBalance(
    account ?? undefined,
    govToken,
    'totalBalanceOf',
    GOVERNANCE_TOKEN_INTERFACE
  )
  const lockedGovTokensToClaim: TokenAmount | undefined = useTotalLockedGovTokensEarned()
  const unlockedGovTokensToClaim: TokenAmount | undefined = useTotalUnlockedGovTokensEarned()
  const totalSupply: TokenAmount | undefined = useGovTokenSupply()
  const totalUnlockedSupply: TokenAmount | undefined = useGovTokenSupply('unlockedSupply')

  const govTokenPrice = useUSDPrice(govToken)

  const tooltips: Record<string, string> = {
    unlockedRewards:
      'Unlocked pending rewards - 5% of your claimable rewards will be directly accessible upon claiming.',
    lockedRewards:
      'Locked  - 95% of your claimable rewards will be locked until November 2022. They will thereafter gradually unlock until November 2023.',
    lockedBalance:
      'Locked balance - Your locked balance will remain locked until November 2022. Your locked tokens will thereafter gradually unlock until November 2023.'
  }

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">Your {govToken?.symbol} Breakdown</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowUniBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <AutoColumn gap="sm" justify="center">
              <UniTokenAnimated width="50px" src={getTokenLogo()} />{' '}
              <TYPE.white fontSize={20}>{total?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
            </AutoColumn>
            <Break />
            <AutoColumn gap="sm">
              <RowBetween>
                <TYPE.white>
                  <MouseoverTooltip text={tooltips.unlockedRewards}>
                    <span role="img">🔓</span>
                    Pending
                  </MouseoverTooltip>
                </TYPE.white>
                <TYPE.white>
                  {unlockedGovTokensToClaim?.toFixed(2, { groupSeparator: ',' })}{' '}
                  {unlockedGovTokensToClaim && unlockedGovTokensToClaim.greaterThan('0') && (
                    <StyledInternalLink className="z-10" onClick={() => setShowUniBalanceModal(false)} to="/staking">
                      (claim)
                    </StyledInternalLink>
                  )}
                </TYPE.white>
              </RowBetween>

              <RowBetween>
                <TYPE.white color="white">
                  <MouseoverTooltip text={tooltips.lockedRewards}>
                    <span role="img" aria-label="wizard-icon">
                      🔒
                    </span>
                    Locked
                  </MouseoverTooltip>
                </TYPE.white>
                <TYPE.white color="white">
                  {lockedGovTokensToClaim?.toFixed(2, { groupSeparator: ',' })}{' '}
                  {lockedGovTokensToClaim && lockedGovTokensToClaim.greaterThan('0') && (
                    <StyledInternalLink onClick={() => setShowUniBalanceModal(false)} to="/staking">
                      (claim)
                    </StyledInternalLink>
                  )}
                </TYPE.white>
              </RowBetween>
            </AutoColumn>
            <Break />
            <AutoColumn gap="sm">
              <RowBetween>
                <TYPE.white>
                  <MouseoverTooltip text={tooltips.lockedBalance}>Locked Balance:</MouseoverTooltip>
                </TYPE.white>
                <TYPE.white>{govTokenLockedBalance?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white>Total Balance:</TYPE.white>
                <TYPE.white>{govTokenTotalBalance?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
              </RowBetween>
            </AutoColumn>
            <Break />
          </>
        )}
        <AutoColumn gap="sm">
          <RowBetween>
            <TYPE.white>{govToken?.symbol} circulation:</TYPE.white>
            <TYPE.white>{totalUnlockedSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
          </RowBetween>

          <RowBetween>
            <TYPE.white>{govToken?.symbol} Total burned:</TYPE.white>
            <TYPE.white>{totalburned?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
          </RowBetween>

          <RowBetween>
            <TYPE.white>{govToken?.symbol} total supply:</TYPE.white>
            <TYPE.white>{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
          </RowBetween>
        </AutoColumn>
        {govTokenPrice && (
          <>
            <Break />
            <AutoColumn gap="sm">
              <RowBetween>
                <TYPE.white>{govToken?.symbol} price:</TYPE.white>
                <TYPE.white>${Number(govTokenPrice.toSignificant(6)) ?? '-'}</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white>{govToken?.symbol} circ. market cap:</TYPE.white>
                <TYPE.white>
                  ${Math.round(Number(totalUnlockedSupply?.toFixed()) * Number(govTokenPrice.toSignificant(8)))}
                </TYPE.white>
              </RowBetween>

              <RowBetween>
                <TYPE.white>{govToken?.symbol} total market cap:</TYPE.white>
                <TYPE.white>
                  ${Math.round(Number(totalSupply?.toFixed()) * Number(govTokenPrice.toSignificant(6)))}
                </TYPE.white>
              </RowBetween>
            </AutoColumn>
          </>
        )}
      </ModalUpper>
    </ContentWrapper>
  )
}
