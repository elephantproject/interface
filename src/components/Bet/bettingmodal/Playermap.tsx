import React from 'react'
// import { useEffect } from 'react'
// import { useSingleCallResult } from 'state/multicall/hooks'
// import { useDiceContract } from '../../../hooks/useContract'

interface PlayerModalProps {
  bets?: number
}

export default function Playermap({ bets }: PlayerModalProps) {
  //   const pit = useDiceContract()
  //   const maxbetsinfo = useSingleCallResult(pit, '_players', [c ? c : '0'])
  //   const ebets = bets ? bets : 1

  //   let playerarray = []

  //   useEffect(() => {
  //     const a = ebets - 1
  //     const b = "'" + a + "'"

  //     if (a === 0) {
  //       return
  //     } else {
  //       let c = useSingleCallResult(pit, '_players', [b])
  //       console.log(c)
  //       playerarray.push(c)
  //     }
  //   })

  return (
    <div>
      {bets}
      {/* {console.log(maxbetsinfo.result)} */}
    </div>
  )
}
