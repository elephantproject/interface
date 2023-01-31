import React from 'react'

import { useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'

import { useNFT0 } from 'hooks/useContract'

import NFTOWNEDCARD from './components/nftownedcard'

import { useStateWithCallbackLazy } from 'use-state-with-callback'

export default function NFTACCOUNT() {
  const { account } = useWeb3React()
  const contract = useNFT0()

  const [ownedNFTs, setOwnedNFTs] = useStateWithCallbackLazy<Number[]>([])

  useEffect(() => {
    const getCollection = async () => {
      const arr = []
      // STEP 1: Get the current owner's balance
      if (account && contract) {
        await setOwnedNFTs([], () => {
          console.log('rendercheck')
        })
        const balance = await contract?.balanceOf(account)
        // STEP 2: Loop through and grab all the NFTs this user owns
        for (let i = 0; i < balance; i++) {
          const ans = await contract.tokenOfOwnerByIndex(account, balance - i - 1)
          arr.push(ans)
        }
        await setOwnedNFTs(arr, () => {
          console.log('rendercheck')
        })
      }
    }
    if (account && contract) {
      getCollection()
    }
  }, [])

  return (
    <div className="lg:grid grid-cols-6 sm:flex">
      {ownedNFTs.map((item, index) => {
        return <NFTOWNEDCARD key={index} id={item.toString()} />
      })}
    </div>
  )
}
