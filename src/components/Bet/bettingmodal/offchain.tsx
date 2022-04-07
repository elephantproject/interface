import React, { useState, useCallback } from 'react'
import useTransactionDeadline from '../../../hooks/useTransactionDeadline'
import { AutoColumn } from '../../Column'
import styled from 'styled-components'
import { RowBetween } from '../../Row'
import { ButtonConfirmed, ButtonError } from '../../Button'
import BetInputPanel from 'components/CurrencyInputPanel/bettingui'
import { TokenAmount, Token } from 'elephantdexsdk'
import { useActiveWeb3React } from '../../../hooks'
import { maxAmountSpend } from '../../../utils/maxAmountSpend'
import { useApproveCallback, ApprovalState } from '../../../hooks/useApproveCallback'
import { useDerivedStakeInfo } from '../../../state/stake/hooks'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../../../state/transactions/hooks'

import { calculateGasMargin } from '../../../utils'
import { useMasterBankContract } from '../../../hooks/useContract'

// import Playermap from './Playermap'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 3rem;
`

interface StakingModalProps {
  isOpen: boolean
  onDismiss: () => void
  stakingToken: Token
  userLiquidityUnstaked: TokenAmount | undefined
}

export default function OCBettingUI({ isOpen, onDismiss, stakingToken, userLiquidityUnstaked }: StakingModalProps) {
  const { library } = useActiveWeb3React()

  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const { parsedAmount, error } = useDerivedStakeInfo(typedValue, stakingToken, userLiquidityUnstaked)

  // state for pending and submitted txn views
  const addTransaction = useTransactionAdder()

  const MB = useMasterBankContract()

  // approval data for stake
  const deadline = useTransactionDeadline()
  const [approval, approveCallback] = useApproveCallback(parsedAmount, MB?.address)

  async function onStake() {
    if (MB && parsedAmount && deadline) {
      if (approval === ApprovalState.APPROVED) {
        const formattedAmount = `0x${parsedAmount.raw.toString(16)}`
        const estimatedGas = await MB.estimateGas.BuyGameTokens(formattedAmount)

        await MB.BuyGameTokens(formattedAmount, {
          gasLimit: calculateGasMargin(estimatedGas)
        })
          .then((response: TransactionResponse) => {
            MB.on('Bought', amount => {
              console.log(parseInt(amount._hex) / 1000000000000000000)
            })

            console.log(response)
            addTransaction(response, {
              summary: `Buy ${typedValue} game tokens with Elephant`
            })
          })
          .catch((error: any) => {
            console.log(error)
          })
      } else {
        throw new Error('Attempting to stake without approval or a signature. Please contact support.')
      }
    }
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback((typedValue: string) => {
    setTypedValue(typedValue)
  }, [])

  const minbetinfo = 5

  // used for max input button
  const maxAmountInput = maxAmountSpend(userLiquidityUnstaked)
  const atMaxAmount = Boolean(maxAmountInput && parsedAmount?.equalTo(maxAmountInput))
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])

  async function onAttemptToApprove() {
    if (!MB || !library || !deadline) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmount
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    return approveCallback()
  }

  return (
    <ContentWrapper gap="lg">
      <BetInputPanel
        value={typedValue}
        onUserInput={onUserInput}
        onMax={handleMax}
        showMaxButton={!atMaxAmount}
        currency={stakingToken}
        label={''}
        disableCurrencySelect={true}
        customBalanceText={'Available to bet: '}
        id="stake-liquidity-token"
        minimumbet={minbetinfo.toString()}
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
      <div className="">
        <ButtonError
          disabled={!!error || approval !== ApprovalState.APPROVED}
          error={!!error && !!parsedAmount}
          onClick={() => onStake()}
        >
          {error ?? 'Buy Game Tokens'}
        </ButtonError>
      </div>
    </ContentWrapper>
    // <Game/>
  )
}
