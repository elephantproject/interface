import React, { useEffect, useState } from 'react'

// import { useNFT1 } from 'hooks/useContract'

// import { useSingleCallResult } from 'state/multicall/hooks'

import { TransactionResponse } from '@ethersproject/providers'

import { TokenAmount, Token } from 'elephantdexsdk'

import { ButtonConfirmed, ButtonError } from 'components/Button'

import { useActiveWeb3React } from 'hooks'
import useTransactionDeadline from '../../../hooks/useTransactionDeadline'

import { useApproveCallback, ApprovalState } from '../../../hooks/useApproveCallback'

import { useTransactionAdder } from '../../../state/transactions/hooks'

import { tryParseAmount } from 'state/swap/hooks'

import { calculateGasMargin } from '../../../utils'

import { useSingleCallResult } from '../../../state/multicall/hooks'

interface StakingModalProps {
  isOpen: boolean
  onDismiss: () => void
  stakingToken: Token
  userLiquidityUnstaked: TokenAmount | undefined
  usenftfunction: Function
  price: string
}

export default function NFTMINT({
  isOpen,
  onDismiss,
  stakingToken,
  userLiquidityUnstaked,
  price,
  usenftfunction
}: StakingModalProps) {
  const [nft1, setnftdata] = useState({
    image: '',
    name: '',
    id: '',
    description: '',
    nfturl: ''
  })

  const addTransaction = useTransactionAdder()

  const nft = usenftfunction()

  const minted = parseInt(useSingleCallResult(nft, 'totalSupply')?.result?.[0]._hex)

  useEffect(() => {
    setnftdata({
      image: '',
      name: '',
      id: '',
      description: '',
      nfturl: ''
    })
  }, [])

  const { library } = useActiveWeb3React()

  async function onAttemptToApprove() {
    if (!nft || !library || !deadline) throw new Error('missing dependencies')

    return approveCallback()
  }

  async function onStake(mintamount: any) {
    if (nft && parsedAmount && deadline) {
      if (approval === ApprovalState.APPROVED) {
        const estimatedGas = await nft.estimateGas.mint(mintamount)
        await nft
          .mint(mintamount, {
            gasLimit: calculateGasMargin(estimatedGas)
          })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: `Minted 1 Elephant NFT`
            })
          })
          .catch((error: any) => {
            if (error?.code === -32603) {
            }
            console.log(error)
          })
      } else {
        throw new Error('Attempting to stake without approval or a signature. Please contact support.')
      }
    }
  }

  const parsedAmount = tryParseAmount(price, stakingToken)

  const deadline = useTransactionDeadline()
  const [approval, approveCallback] = useApproveCallback(parsedAmount, nft?.address)

  return (
    <div className="m-auto p-12">
      <div className=" ">
        {/*  */}
        <div id="nftcard" className="bg-yellow-500 p-5 rounded-xl max-w-xs ">
          <span className="group block relative rounded-md overflow-hidden">
            <h1 className="text-xl font-bold text-center p-2">Elephant NFT Series #0</h1>
            <div className="hidden group-hover:block absolute inset-0"></div>
            <img src="https://i.ibb.co/F6HZ0D3/573.png" alt="Elephant NFT" className="m-auto" />
          </span>
          <a href="" className="block text-left text-white my-4 font-semibold text-lg hover:text-cyan"></a>
          <p className=" font-light text-left">{nft1.description}</p>
          <div className="flex  justify-between items-center mt-2">
            <div className=" m-1  ">
              <p className="inline-block">{price} Elephant</p>
              <img
                className="w-6 ml-1.5 inline-block"
                src="https://elephant.ac/static/media/elephant-token-logo.f1dd854b.png"
              />

              <p className="">Minted: {minted}/10000</p>
            </div>
          </div>
          <ButtonConfirmed
            mr="0.5rem"
            onClick={onAttemptToApprove}
            confirmed={approval === ApprovalState.APPROVED}
            disabled={approval !== ApprovalState.NOT_APPROVED}
          >
            Approve
          </ButtonConfirmed>

          <ButtonError disabled={approval !== ApprovalState.APPROVED} error={!approval} onClick={() => onStake(1)}>
            {'Mint'}
          </ButtonError>
        </div>

        {/*  */}
      </div>
    </div>
  )
}
