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
        <div className={winningnumber === 1 ? 'text-green-500 inline' : 'inline'}>
          1:
          {one ? (
            <img className="w-10 p-2 inline" src="https://elephant.ac/static/media/elephant-token-logo.f1dd854b.png" />
          ) : null}
        </div>
      </div>
      <div className="">
        <div className={winningnumber === 2 ? 'text-green-500 inline' : 'inline'}>
          2:
          {two ? (
            <img className="w-10 p-2 inline" src="https://elephant.ac/static/media/elephant-token-logo.f1dd854b.png" />
          ) : null}
        </div>
      </div>
      <div className="">
        <div className={winningnumber === 3 ? 'text-green-500 inline' : 'inline'}>
          3:
          {three ? (
            <img className="w-10 p-2 inline" src="https://elephant.ac/static/media/elephant-token-logo.f1dd854b.png" />
          ) : null}
        </div>
      </div>
      <div className="">
        <div className={winningnumber === 4 ? 'text-green-500 inline' : 'inline'}>
          4:
          {four ? (
            <img className="w-10 p-2 inline" src="https://elephant.ac/static/media/elephant-token-logo.f1dd854b.png" />
          ) : null}
        </div>
      </div>
      <div className="">
        <div className={winningnumber === 5 ? 'text-green-500 inline' : 'inline'}>
          5:
          {five ? (
            <img className="w-10 p-2 inline" src="https://elephant.ac/static/media/elephant-token-logo.f1dd854b.png" />
          ) : null}
        </div>
      </div>
      <div className="">
        <div className={winningnumber === 6 ? 'text-green-500 inline' : 'inline'}>
          6:
          {six ? (
            <img className="w-10 p-2 inline" src="https://elephant.ac/static/media/elephant-token-logo.f1dd854b.png" />
          ) : null}
        </div>
      </div>
    </div>
  )
}
