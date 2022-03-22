import React, { useState } from 'react'
import { TokenAmount } from 'elephantdexsdk'
import { AutoColumn } from '../../../components/Column'
import styled from 'styled-components'

import { RouteComponentProps } from 'react-router-dom'

import BettingUI from '../../../components/Bet/bettingmodal/bettingui'
import ModifiedUnstakingModal from '../../../components/Pit/ModifiedUnstakingModal'
import ClaimModal from '../../../components/Pit/ClaimModal'
import { useTokenBalance } from '../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks'
// import { CountUp } from 'use-count-up'

// import usePrevious from '../../../hooks/usePrevious'

import { PIT } from '../../../constants'
import { GOVERNANCE_TOKEN_INTERFACE } from '../../../constants/abis/governanceToken'
import { PIT_INTERFACE } from '../../../constants/abis/pit'
import useGovernanceToken from 'hooks/useGovernanceToken'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

/*const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  position: relative;
  max-width: 640px;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
`*/

/*const StyledDataCard = styled(DataCard)<{ bgColor?: any; showBackground?: any }>`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #1e1a31 0%, #3d51a5 100%);
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%,  ${showBackground ? theme.black : theme.bg5} 100%) `};
`*/

/*const PoolData = styled(DataCard)`
  background: none;
  border: 1px solid ${({ theme }) => theme.bg4};
  padding: 1rem;
  z-index: 1;
`*/

/*const VoteCard = styled(DataCard)`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #27ae60 0%, #000000 100%);
  overflow: hidden;
`*/

export default function Pit({
  match: {
    params: { currencyIdA, currencyIdB }
  }
}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const { account, chainId } = useActiveWeb3React()

  const govToken = useGovernanceToken()
  const govTokenBalance: TokenAmount | undefined = useTokenBalance(
    account ?? undefined,
    govToken,
    'balanceOf',
    GOVERNANCE_TOKEN_INTERFACE
  )

  const pit = chainId ? PIT[chainId] : undefined
  const pitBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, pit, 'balanceOf', PIT_INTERFACE)

  const userLiquidityStaked = pitBalance
  const userLiquidityUnstaked = govTokenBalance

  // toggle for staking modal and unstaking modal
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showUnstakingModal, setShowUnstakingModal] = useState(false)
  const [showClaimModal, setShowClaimModal] = useState(false)

  //   const countUpAmount = pitBalance?.toFixed(6) ?? '0'
  //   const countUpAmountPrevious = usePrevious(countUpAmount) ?? '0'

  return (
    <PageWrapper gap="lg" justify="center">
      {govToken && (
        <>
          <BettingUI
            isOpen={showStakingModal}
            onDismiss={() => setShowStakingModal(false)}
            stakingToken={govToken}
            userLiquidityUnstaked={userLiquidityUnstaked}
          />
          <ModifiedUnstakingModal
            isOpen={showUnstakingModal}
            onDismiss={() => setShowUnstakingModal(false)}
            userLiquidityStaked={userLiquidityStaked}
            stakingToken={govToken}
          />
          <ClaimModal isOpen={showClaimModal} onDismiss={() => setShowClaimModal(false)} />
        </>
      )}
    </PageWrapper>
  )
}
