import React from 'react'

import { useEffect, useState } from 'react'

interface nftprops {
  id: string
}

export default function NFTOWNEDCARD(id: nftprops) {
  const [fetchedData, setFetchedData] = useState<any>(null)
  const [imageLink, setImageLink] = useState('')

  useEffect(() => {
    fetch(
      `https://w3s.link/ipfs/QmQzAfTQ3VifsYXK1Z3pQXD9d7HLcsBzKQ4Beyz2hyUagL/${id.id}.json`,
      {
        mode: 'cors'
      } // no-cors, *cors, same-origin
    ).then(resp => {
      if (resp.ok) {
        resp.json().then(content => {
          setFetchedData(content)
          setImageLink(`https://w3s.link/ipfs/QmUbU1GNVGGSoDDPhY1FcANQR1mPhkrK8YSqXZy8Tf76sc/${id.id}.png`)
        })
      } else {
        console.log('Could not fetch data')
      }
    })
  }, [id])

  return (
    <div id="nftcard" className="m-5 minw bg-yellow-500 p-5 rounded-xl minh ">
      <img src={imageLink} />

      <h1 className="block text-center text-white my-4 font-semibold text-lg  hover:text-cyan">{fetchedData?.name}</h1>
    </div>
  )
}
