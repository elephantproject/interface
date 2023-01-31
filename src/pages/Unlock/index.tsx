import React from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'

import { RouteComponentProps } from 'react-router-dom'
import { TYPE } from '../../theme'

import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import { ButtonPrimary } from '../../components/Button'
import { useActiveWeb3React } from '../../hooks'
import { CountUp } from 'use-count-up'

import usePrevious from '../../hooks/usePrevious'

import useGovernanceToken from 'hooks/useGovernanceToken'

import { useGovTokenContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'

import { TransactionResponse } from '@ethersproject/providers'

import { calculateGasMargin } from 'utils'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

/*const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  position: relative;
  max-width: 640px;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
`*/

const BottomSection = styled(AutoColumn)`
  border-radius: 12px;
  width: 100%;
  position: relative;
`

/*const StyledDataCard = styled(DataCard)<{ bgColor?: any; showBackground?: any }>`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #1e1a31 0%, #3d51a5 100%);
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%,  ${showBackground ? theme.black : theme.bg5} 100%) `};
`*/

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) => theme.bg3};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  margin-top: -40px;
  padding: 0 1.25rem 1rem 1.25rem;
  padding-top: 32px;
  z-index: 1;
`

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

const CustomCard = styled(DataCard)`
  background: radial-gradient(
    76.02% 75.41% at 1.84% 0%,
    ${({ theme }) => theme.customCardGradientStart} 0%,
    ${({ theme }) => theme.customCardGradientEnd} 100%
  );
  overflow: hidden;
  z-index: 1;
`

const DataRow = styled(RowBetween)`
  justify-content: center;
  gap: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 12px;
  `};
`

export default function Unlock({}: RouteComponentProps<{ currencyIdA: string; currencyIdB: string }>) {
  const { account } = useActiveWeb3React()

  const govToken = useGovernanceToken()

  const govtokencontract = useGovTokenContract()
  // toggle for staking modal and unstaking modal

  const unlockinfo = useSingleCallResult(govtokencontract, 'canUnlockAmount', [
    account ? account : '0x560F2C36FD83EEDcda5cE9C7E183378fC1d8D3Ea'
  ])?.result?.[0]._hex

  const parseinfo = (parseInt(unlockinfo, 16) / 1000000000000000000).toString()

  const countUpAmount = parseinfo ?? '0'
  const countUpAmountPrevious = usePrevious(countUpAmount) ?? '0'

  async function onStake() {
    if (govtokencontract) {
      const estimatedGas = await govtokencontract.estimateGas.unlock()
      await govtokencontract
        .unlock({
          gasLimit: calculateGasMargin(estimatedGas)
        })
        .then((response: TransactionResponse) => {
          console.log(response)
        })
        .catch((error: any) => {
          console.log(error)
        })
    } else {
      throw new Error('Attempting to stake without approval or a signature. Please contact support.')
    }
  }

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="lg" justify="center">
        <BottomSection gap="lg" justify="center">
          <CustomCard>
            <CardSection>
              <CardBGImage desaturate />
              <CardNoise />
              <AutoColumn className="z" gap="md">
                <RowBetween style={{ alignItems: 'baseline' }}>
                  <TYPE.white fontSize={14}>
                    Claim your {govToken?.symbol} tokens to restake, buy NFTs or play at the casino.
                  </TYPE.white>
                </RowBetween>
                <br />
              </AutoColumn>
            </CardSection>
          </CustomCard>
          <StyledBottomCard dim={false}>
            <CardBGImage desaturate />
            <CardNoise />
            <AutoColumn gap="sm">
              <RowBetween>
                <div>
                  <TYPE.black>Your Locked {govToken?.symbol} Balance</TYPE.black>
                </div>
              </RowBetween>
              <RowBetween style={{ alignItems: 'baseline' }}>
                <TYPE.largeHeader fontSize={36} fontWeight={600}>
                  <CountUp
                    key={countUpAmount}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpAmountPrevious)}
                    end={parseFloat(countUpAmount)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                </TYPE.largeHeader>
              </RowBetween>
            </AutoColumn>
          </StyledBottomCard>
        </BottomSection>

        {account && (
          <TYPE.main>
            You have {Number(parseinfo)?.toFixed(2)} {govToken?.symbol} tokens available to claim.
          </TYPE.main>
        )}

        {account && (
          <DataRow style={{ marginBottom: '0rem' }}>
            <ButtonPrimary padding="8px" borderRadius="8px" width="160px" onClick={() => onStake()}>
              Claim
            </ButtonPrimary>
          </DataRow>
        )}
      </TopSection>
    </PageWrapper>
  )
}
