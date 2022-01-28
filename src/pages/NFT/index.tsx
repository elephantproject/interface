import React, { useState } from 'react'
import { TokenAmount } from 'elephantdexsdk'

import { RouteComponentProps } from 'react-router-dom'

import ClaimModal from '../../components/Pit/ClaimModal'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
// import { CountUp } from 'use-count-up'

// import usePrevious from '../../../hooks/usePrevious'

import { GOVERNANCE_TOKEN_INTERFACE } from '../../constants/abis/governanceToken'
import useGovernanceToken from 'hooks/useGovernanceToken'
import NFT from './components/nft'

import { useNFT1, useNFT2 } from 'hooks/useContract'

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
  const { account } = useActiveWeb3React()

  const govToken = useGovernanceToken()
  const govTokenBalance: TokenAmount | undefined = useTokenBalance(
    account ?? undefined,
    govToken,
    'balanceOf',
    GOVERNANCE_TOKEN_INTERFACE
  )

  const userLiquidityUnstaked = govTokenBalance

  // toggle for staking modal and unstaking modal
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showClaimModal, setShowClaimModal] = useState(false)

  //   const countUpAmount = pitBalance?.toFixed(6) ?? '0'
  //   const countUpAmountPrevious = usePrevious(countUpAmount) ?? '0'

  return (
    <div className="container lg:flex sm:grid sm:grid-cols-1">
      {govToken && (
        <>
          <NFT
            isOpen={showStakingModal}
            onDismiss={() => setShowStakingModal(false)}
            stakingToken={govToken}
            userLiquidityUnstaked={userLiquidityUnstaked}
            url={'https://gateway.pinata.cloud/ipfs/QmPxhNtDHLTygunNczmY5xYjFTXT5uBMw7KKA8S5Xjc3PT'}
            price={'9000'}
            nftid={0}
            usenftfunction={useNFT1}
          ></NFT>
          <NFT
            isOpen={showStakingModal}
            onDismiss={() => setShowStakingModal(false)}
            stakingToken={govToken}
            userLiquidityUnstaked={userLiquidityUnstaked}
            url={'https://gateway.pinata.cloud/ipfs/QmZZisC7VNdP8mfTaCPZgbXHMnwq3KuqQPGTYjARxFziYr'}
            price={'25000'}
            nftid={143}
            usenftfunction={useNFT2}
          ></NFT>
          <NFT
            isOpen={showStakingModal}
            onDismiss={() => setShowStakingModal(false)}
            stakingToken={govToken}
            userLiquidityUnstaked={userLiquidityUnstaked}
            url={'https://gateway.pinata.cloud/ipfs/QmZZisC7VNdP8mfTaCPZgbXHMnwq3KuqQPGTYjARxFziYr'}
            price={'25000'}
            nftid={547}
            usenftfunction={useNFT2}
          ></NFT>

          <ClaimModal isOpen={showClaimModal} onDismiss={() => setShowClaimModal(false)} />
        </>
      )}
    </div>
  )
}
