import React, { useState } from 'react'
import { TokenAmount } from 'elephantdexsdk'
import { AutoColumn } from '../../../components/Column'
import styled from 'styled-components'
import OffChain from '../../../components/Bet/bettingmodal/offchain'
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

export default function Coinflip({}) {
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
          <OffChain
            GameKey={'lmZPb21CKXNi6eTuypVo0kyNB8iTedV9'}
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
