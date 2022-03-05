import React, { useState, useEffect, useCallback } from 'react'
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
import { useDiceContract } from '../../../hooks/useContract'

import useSound from 'use-sound'

import winsfx from '../../../assets/bloop.mp3'

import { calculateGasMargin } from '../../../utils'
import useGovernanceToken from '../../../hooks/useGovernanceToken'
import { useWeb3React } from '@web3-react/core'

import { useSingleCallResult } from 'state/multicall/hooks'
import BetCount from './betcount'

// import Playermap from './Playermap'

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
  const { account } = useWeb3React()

  const addy = account?.toString()

  const [play] = useSound(winsfx)

  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const { parsedAmount, error } = useDerivedStakeInfo(typedValue, stakingToken, userLiquidityUnstaked)

  // const [betarray, setbetarray] = useState([] as any)

  const govToken = useGovernanceToken()

  // state for pending and submitted txn views
  const addTransaction = useTransactionAdder()

  const pit = useDiceContract()

  const lastrollinfo = useSingleCallResult(pit, 'lastnumberwin')?.result?.[0]._hex
  const currentbetsinfo = useSingleCallResult(pit, 'numberOfBets')?.result?.[0]._hex

  const lastrolled = parseInt(lastrollinfo, 16)

  const maxbetsinfo = useSingleCallResult(pit, 'maximumBets')?.result?.[0]._hex

  const maxbets = parseInt(maxbetsinfo, 16)

  const currentbets = parseInt(currentbetsinfo, 16)

  const bankbalanceinfo = useSingleCallResult(pit, 'contractbalance')?.result?.[0]._hex

  const minbetinfo = parseInt(useSingleCallResult(pit, 'minimumbet')?.result?.[0]._hex, 16) / 1000000000000000000

  const bankbalance = parseInt(bankbalanceinfo, 16) / 1000000000000000000

  const number0 = parseInt(useSingleCallResult(pit, 'tenbets', ['0'])?.result?.[0]._hex)
  const number1 = parseInt(useSingleCallResult(pit, 'tenbets', ['1'])?.result?.[0]._hex)
  const number2 = parseInt(useSingleCallResult(pit, 'tenbets', ['2'])?.result?.[0]._hex)
  const number3 = parseInt(useSingleCallResult(pit, 'tenbets', ['3'])?.result?.[0]._hex)
  const number4 = parseInt(useSingleCallResult(pit, 'tenbets', ['4'])?.result?.[0]._hex)

  const sig = bankbalance.toFixed(2)

  const betamountinfo = parseInt(useSingleCallResult(pit, '_bets', [addy])?.result?.[1]._hex) / 1000000000000000000

  const betnumberinfo = parseInt(useSingleCallResult(pit, '_bets', [addy])?.result?.[2]._hex)

  // approval data for stake
  const deadline = useTransactionDeadline()
  const [approval, approveCallback] = useApproveCallback(parsedAmount, pit?.address)

  // function loop()
  // {
  //   for (let i = 0; i < 6; i++) {

  //   }
  // }

  //   function localstoragecount()
  //   {

  // localStorage.setItem("1", "value")

  //   }

  async function onStake(guess: any) {
    if (pit && parsedAmount && deadline) {
      if (approval === ApprovalState.APPROVED) {
        const formattedAmount = `0x${parsedAmount.raw.toString(16)}`
        const estimatedGas = await pit.estimateGas.placeBet(guess, formattedAmount)
        await pit
          .placeBet(guess, formattedAmount, {
            gasLimit: calculateGasMargin(estimatedGas)
          })
          .then((response: TransactionResponse) => {
            console.log(response)
            addTransaction(response, {
              summary: `Bet ${typedValue} of ${govToken?.symbol} on Dice`
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

  async function winfx() {
    if (localStorage.getItem(lastrolled.toString())) {
      await console.log('Win on ' + lastrolled)
      await play({ forceSoundEnabled: true })
    }

    await localStorage.clear()
  }

  useEffect(() => {
    if (account && currentbets === 0) {
      winfx()
    } else if (localStorage.getItem(betnumberinfo.toString())) {
      const add = localStorage.getItem(betnumberinfo.toString())

      const samebet = Number(add) + betamountinfo

      localStorage.setItem(betnumberinfo.toString(), samebet.toString())
    } else {
      localStorage.setItem(betnumberinfo.toString(), betamountinfo.toString())
    }
  }, [currentbets]) // <-- here put the parameter to listen

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
      <div className="rounded-md leading-loose  cardbg font-mono p-11 backdrop-filter backdrop-grayscale backdrop-blur-2xl">
        <div className="container text-red-800 rounded-lg bg-gray-100 opacity-80 p-5">
          <h1>
            Contract Balance : {sig} {govToken?.symbol}
          </h1>
          <h1>Minimum Bet : {minbetinfo}</h1>
          <h1>
            Roll After : <div className="text-2xl text-bold">{maxbets} Bets </div>
          </h1>
          <h1> Current Bets : {currentbets} </h1>
          {/* <h1> Round Status: {currentbets != maxbets ? 'betting' : 'rolling'}</h1> */}
          <div className={' text-blue-500 font-extrabold text-4xl'}>{lastrolled} </div>
        </div>
        <div className="text-black flex flex-row divide-x">
          <div className="w-6 bg-white text-center"> {number0}</div>
          <div className="w-6 bg-white text-center">{number1}</div>
          <div className="w-6 bg-white text-center">{number2}</div>
          <div className="w-6 bg-white text-center">{number3}</div>
          <div className="w-6 bg-blue-200 text-center"> {number4}</div>
          <div className="p-2 text-xs">Last Number Rolled</div>
          {/* Last 5 Numbers */}
        </div>
      </div>

      <BetCount winningnumber={lastrolled} />

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
    </ContentWrapper>
  )
}
