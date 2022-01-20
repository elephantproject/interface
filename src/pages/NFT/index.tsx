import React, { useEffect, useState } from 'react'

// import { useNFT1 } from 'hooks/useContract'

// import { useSingleCallResult } from 'state/multicall/hooks'

import axios from 'axios'

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

export default function NFT() {
  const [nft1, setnftdata] = useState({
    image: '',
    name: '',
    id: '',
    description: ''
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

  useEffect(() => {
    async function fetchMyAPI() {
      await axios
        .get('https://gateway.pinata.cloud/ipfs/QmRbR8FubMtksCkLbWCiHUBwz9oTZyFvedMDmvTEHS5Mr8?preview=1')
        .then(resp => {
          console.log(resp.data)
          setnftdata({
            image: resp.data[0].image,
            name: resp.data[0].name,
            id: resp.data[0].id,
            description: resp.data[0].description
          })
        })
    }

    fetchMyAPI()
  }, [])

  return (
    <div className="w-full">
      <h1 className="text-center mb-10">Elephant NFT</h1>
      <div className="grid grid-cols-1 m-auto w-3/4 text-center ">
        {/*  */}
        <div id="nftcard" className="bg-yellow-500 p-5 mx-5 rounded-xl max-w-xs ">
          <a href="#" className="group block relative rounded-md overflow-hidden">
            <div className="hidden group-hover:block absolute inset-0 bg-cyan/50"></div>
            <img
              src="/assets/icon-view.fffad88f.svg"
              className="hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <img src={nft1.image} alt="Elephant NFT" className="" />
          </a>
          <a href="#" className="block text-white my-4 font-semibold text-lg hover:text-cyan">
            {nft1.name} #{nft1.id}
          </a>
          <p className=" font-light">{nft1.description}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex text-cyan space-x-2 m-auto">
              <img src="https://nft-card-eosin.vercel.app/assets/icon-ethereum.76974d10.svg" />
              <p>10000 Elephant</p>
            </div>
            <div className="flex items-center mx-auto text-soft-blue space-x-2 whitespace-nowrap"></div>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  )
}
