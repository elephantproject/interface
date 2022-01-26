import React, { useEffect, useState } from 'react'

// import { useNFT1 } from 'hooks/useContract'

// import { useSingleCallResult } from 'state/multicall/hooks'

import axios from 'axios'

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
  const [attempting, setAttempting] = useState<boolean>(false)
  const [hash, setHash] = useState<string | undefined>()
  const [failed, setFailed] = useState<boolean>(false)

  // const [purchasestate, setpurchasestate] = useState()

  const nft = usenftfunction()

  useEffect(() => {
    async function fetchMyAPI() {
      await axios.get(url).then(resp => {
        setnftdata({
          image: resp.data[0].image,
          name: resp.data[0].name,
          id: resp.data[0].id,
          description: resp.data[0].description,
          nfturl: resp.data[0].external_url
        })
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
    setAttempting(true)
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
              summary: `asdfasdfasdf`
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

  const a = useSingleCallResult(nft, '_nft')?.result?.[0]

  const parsedAmount = tryParseAmount(price, stakingToken)

  const deadline = useTransactionDeadline()
  const [approval, approveCallback] = useApproveCallback(parsedAmount, nft?.address)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 m-auto w-3/4 text-center ">
        {/*  */}
        <div id="nftcard" className="bg-yellow-500 p-5 mx-5 rounded-xl max-w-xs ">
          <a href={nft1.nfturl} className="group block relative rounded-md overflow-hidden">
            <div className="hidden group-hover:block absolute inset-0 bg-cyan/50"></div>
            <h2>{a}</h2>
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
            {'Buy NFT'}
          </ButtonError>
        </div>

        {console.log(attempting, hash, failed)}

        {/*  */}
      </div>
    </div>
  )
}
