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
import { useSingleCallResult } from 'state/multicall/hooks'

import { create } from 'ipfs-http-client'

// import { useSingleCallResult } from '../../../state/multicall/hooks'

// import styled from 'styled-components'

// const StyledNavLink = styled(NavLink)`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: left;
//   border-radius: 3rem;
//   outline: none;
//   cursor: pointer;
//   text-decoration: none;
//   color: ${({ theme }) => theme.text2};
//   font-size: 1rem;
//   width: fit-content;
//   margin: 0 12px;
//   font-weight: 500;
// `

interface StakingModalProps {
  isOpen: boolean
  onDismiss: () => void
  stakingToken: Token
  userLiquidityUnstaked: TokenAmount | undefined
  url: string
  price: string
  nftid: number
  usenftfunction: Function
}

export default function NFT({
  isOpen,
  onDismiss,
  stakingToken,
  userLiquidityUnstaked,
  url,
  price,
  nftid,
  usenftfunction
}: StakingModalProps) {
  const [nft1, setnftdata] = useState({
    image: '',
    name: '',
    id: '',
    description: '',
    nfturl: ''
  })

  // const nft = useSingleCallResult(pit, 'lastnumberwin')?.result?.[0]._hex

  const addTransaction = useTransactionAdder()

  // const [purchasestate, setpurchasestate] = useState()

  const nft = usenftfunction()

  const utf8decoder = new TextDecoder()

  const ipfs = create({ url: 'https://bogandoffswap.com' })

  useEffect(() => {
    async function fetchMyAPI() {
      const multihash = url

      let test

      for await (const chunk of ipfs.cat(multihash)) {
        test = JSON.parse(utf8decoder.decode(chunk))
      }

      await setnftdata({
        image: test.image,
        name: test.name ? test.name : null,
        id: test.id ? test.id : null,
        description: test.description,
        nfturl: test.external_url
      })
    }

    fetchMyAPI()
  })

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     let jsondata = await useSingleCallResult(useNFT1(), 'baseURI')?.result?.[0]
  //     await console.log(jsondata)

  //     let response = await fetch('api/data')
  //     response = await response.json()
  //     dataSet(response)
  //   }

  //   fetchMyAPI()
  // }, [])

  const { library } = useActiveWeb3React()

  async function onAttemptToApprove() {
    if (!nft || !library || !deadline) throw new Error('missing dependencies')

    return approveCallback()
  }

  async function onStake(id: any) {
    if (nft && parsedAmount && deadline) {
      if (approval === ApprovalState.APPROVED) {
        const formattedAmount = `0x${parsedAmount.raw.toString(16)}`
        const estimatedGas = await nft.estimateGas.purchasenft(formattedAmount, id)
        await nft
          .purchasenft(formattedAmount, id, {
            gasLimit: calculateGasMargin(estimatedGas)
          })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: `Bought 1 Elephant NFT`
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

  const contractnumber = useSingleCallResult(nft, '_nft')?.result?.[0]

  const parsedAmount = tryParseAmount(price, stakingToken)

  const deadline = useTransactionDeadline()
  const [approval, approveCallback] = useApproveCallback(parsedAmount, nft?.address)

  return (
    <div className="w-full hidden">
      <div className="grid grid-cols-1 m-auto w-3/4 text-center ">
        {/*  */}
        <div id="nftcard" className="bg-yellow-500 p-5 rounded-xl max-w-xs ">
          <h2 className="text-xs text-center mb-3">Contract Address {contractnumber}</h2>
          <a href={nft1.nfturl} className="group block relative rounded-md overflow-hidden">
            <div className="hidden group-hover:block absolute inset-0"></div>
            <img src={nft1.image} alt="Elephant NFT" className="m-auto" />
          </a>
          <a href={nft1.nfturl} className="block text-left text-white my-4 font-semibold text-lg hover:text-cyan">
            {nft1.name} #{nftid}
          </a>
          <p className=" font-light text-left">{nft1.description}</p>
          <div className="flex  justify-between items-center mt-2">
            <div className="flex m-1 text-cyan space-x-2 ">
              <img className="w-6" src="https://elephant.ac/static/media/elephant-token-logo.f1dd854b.png" />
              <p>{price} Elephant</p>
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

          <ButtonError disabled={approval !== ApprovalState.APPROVED} error={!approval} onClick={() => onStake(nftid)}>
            {'Buy Now'}
          </ButtonError>
        </div>

        {/*  */}
      </div>
    </div>
  )
}
