import React from 'react'
// import { useEffect } from 'react'
// import { useSingleCallResult } from 'state/multicall/hooks'
// import { useDiceContract } from '../../../hooks/useContract'

interface Numbers {
  winningnumber: number
}

export default function BetCount({ winningnumber }: Numbers) {
  const one = localStorage.getItem('1')
  const two = localStorage.getItem('2')
  const three = localStorage.getItem('3')
  const four = localStorage.getItem('4')
  const five = localStorage.getItem('5')
  const six = localStorage.getItem('6')

  return (
    <div>
      Your Bets
      <div className="">
        1:<div className={winningnumber === 1 ? 'text-green-500 inline' : 'inline'}> {one}</div>
      </div>
      <div className="">
        2:<div className={winningnumber === 2 ? 'text-green-500 inline' : 'inline'}> {two}</div>
      </div>
      <div className="">
        3:<div className={winningnumber === 3 ? 'text-green-500 inline' : 'inline'}> {three}</div>
      </div>
      <div className="">
        4:<div className={winningnumber === 4 ? 'text-green-500 inline' : 'inline'}> {four}</div>
      </div>
      <div className="">
        5:<div className={winningnumber === 5 ? 'text-green-500 inline' : 'inline'}> {five}</div>
      </div>
      <div className="">
        6:<div className={winningnumber === 6 ? 'text-green-500 inline' : 'inline'}> {six}</div>
      </div>
    </div>
  )
}
