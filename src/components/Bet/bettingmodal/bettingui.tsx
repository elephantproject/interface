import React, { useState, useCallback } from 'react'
import useTransactionDeadline from '../../../hooks/useTransactionDeadline'
import { AutoColumn } from '../../Column'
import styled from 'styled-components'
import { RowBetween } from '../../Row'
import { TYPE } from '../../../theme'
import { ButtonConfirmed, ButtonError } from '../../Button'
import ProgressCircles from '../../ProgressSteps'
import CurrencyInputPanel from '../../CurrencyInputPanel'
import { TokenAmount, Token } from 'elephantdexsdk'
import { useActiveWeb3React } from '../../../hooks'
import { maxAmountSpend } from '../../../utils/maxAmountSpend'
import { useApproveCallback, ApprovalState } from '../../../hooks/useApproveCallback'
import { useDerivedStakeInfo } from '../../../state/stake/hooks'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { useDiceContract } from '../../../hooks/useContract'

import { calculateGasMargin } from '../../../utils'
import useGovernanceToken from '../../../hooks/useGovernanceToken'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

interface StakingModalProps {
  isOpen: boolean
  onDismiss: () => void
  stakingToken: Token
  userLiquidityUnstaked: TokenAmount | undefined
}

export default function BettingUI({ isOpen, onDismiss, stakingToken, userLiquidityUnstaked }: StakingModalProps) {
  const { library } = useActiveWeb3React()

  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const { parsedAmount, error } = useDerivedStakeInfo(typedValue, stakingToken, userLiquidityUnstaked)

  const govToken = useGovernanceToken()

  // state for pending and submitted txn views
  const addTransaction = useTransactionAdder()
  const [attempting, setAttempting] = useState<boolean>(false)
  const [hash, setHash] = useState<string | undefined>()
  const [failed, setFailed] = useState<boolean>(false)

  const pit = useDiceContract()

  // approval data for stake
  const deadline = useTransactionDeadline()
  const [approval, approveCallback] = useApproveCallback(parsedAmount, pit?.address)
  async function onStake(guess: any) {
    setAttempting(true)
    if (pit && parsedAmount && deadline) {
      if (approval === ApprovalState.APPROVED) {
        const formattedAmount = `0x${parsedAmount.raw.toString(16)}`
        const estimatedGas = await pit.estimateGas.placeBet(guess, formattedAmount)
        await pit
          .placeBet(guess, formattedAmount, {
            gasLimit: calculateGasMargin(estimatedGas)
          })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: `Bet ${typedValue} of ${govToken?.symbol} on Dice`
            })
            setHash(response.hash)
          })
          .catch((error: any) => {
            setAttempting(false)
            if (error?.code === -32603) {
              setFailed(true)
            }
            console.log(error)
          })
      } else {
        setAttempting(false)
        throw new Error('Attempting to stake without approval or a signature. Please contact support.')
      }
    }
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  // used for max input button
  const maxAmountInput = maxAmountSpend(userLiquidityUnstaked)
  const atMaxAmount = Boolean(maxAmountInput && parsedAmount?.equalTo(maxAmountInput))
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])

  async function onAttemptToApprove() {
    if (!pit || !library || !deadline) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmount
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    return approveCallback()
  }

  return (
    <ContentWrapper gap="lg">
      {console.log(attempting, hash, failed)}
      <RowBetween>
        <TYPE.mediumHeader>Amount To Bet</TYPE.mediumHeader>
      </RowBetween>
      <CurrencyInputPanel
        value={typedValue}
        onUserInput={onUserInput}
        onMax={handleMax}
        showMaxButton={!atMaxAmount}
        currency={stakingToken}
        label={''}
        disableCurrencySelect={true}
        customBalanceText={'Available to deposit: '}
        id="stake-liquidity-token"
      />

      <RowBetween>
        <ButtonConfirmed
          mr="0.5rem"
          onClick={onAttemptToApprove}
          confirmed={approval === ApprovalState.APPROVED}
          disabled={approval !== ApprovalState.NOT_APPROVED}
        >
          Approve
        </ButtonConfirmed>
      </RowBetween>
      <div className="grid grid-cols-6">
        <ButtonError
          disabled={!!error || approval !== ApprovalState.APPROVED}
          error={!!error && !!parsedAmount}
          onClick={() => onStake(1)}
        >
          {error ?? '1'}
        </ButtonError>
        <ButtonError
          disabled={!!error || approval !== ApprovalState.APPROVED}
          error={!!error && !!parsedAmount}
          onClick={() => onStake(2)}
        >
          {error ?? '2'}
        </ButtonError>
        <ButtonError
          disabled={!!error || approval !== ApprovalState.APPROVED}
          error={!!error && !!parsedAmount}
          onClick={() => onStake(3)}
        >
          {error ?? '3'}
        </ButtonError>
        <ButtonError
          disabled={!!error || approval !== ApprovalState.APPROVED}
          error={!!error && !!parsedAmount}
          onClick={() => onStake(4)}
        >
          {error ?? '4'}
        </ButtonError>
        <ButtonError
          disabled={!!error || approval !== ApprovalState.APPROVED}
          error={!!error && !!parsedAmount}
          onClick={() => onStake(5)}
        >
          {error ?? '5'}
        </ButtonError>
        <ButtonError
          disabled={!!error || approval !== ApprovalState.APPROVED}
          error={!!error && !!parsedAmount}
          onClick={() => onStake(6)}
        >
          {error ?? '6'}
        </ButtonError>
      </div>

      <ProgressCircles steps={[approval === ApprovalState.APPROVED]} disabled={true} />
    </ContentWrapper>
  )
}
