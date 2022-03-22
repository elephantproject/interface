import React from 'react'

import { NavLink } from 'react-router-dom'

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

export function GameCard() {
  return (
    <div
      id="gamecard"
      className=" filter p-12 inline-block rounded-3xl	 bg-yellow-50  opacity-75 hover:opacity-100 transform transition duration-500 hover:scale-110 ease-in-out overflow-hidden drop-shadow-xl "
    >
      <img className=" h-24 m-auto" src="https://elephant.ac/static/media/elephant-token-logo.f1dd854b.png"></img>
      <h1 className="text-black ">Multiplayer Dice</h1>
    </div>
  )
}

export default function Casino() {
  return (
    <div className="w-full font-mono p-12">
      <div className="grid grid-cols-3 m-auto w-3/4 text-center ">
        <div id="gamecard" className="gamecard inline-block">
          <NavLink id={`stake-nav-link`} to={'/casino/coinflip'}>
            Coin Flip
          </NavLink>
        </div>
        <NavLink id={`stake-nav-link`} to={'/casino/dice'}>
          <div
            id="gamecard"
            className=" filter p-12 inline-block rounded-3xl	 bg-yellow-50  opacity-75 hover:opacity-100 transform transition duration-500 hover:scale-110 ease-in-out overflow-hidden drop-shadow-xl "
          >
            <img className=" h-24 m-auto" src="https://elephant.ac/static/media/elephant-token-logo.f1dd854b.png"></img>
            <h1 className="text-black ">Multiplayer Dice</h1>
          </div>
        </NavLink>

        <div id="gamecard" className="gamecard inline-block">
          <NavLink id={`stake-nav-link`} to={'/casino/bait'}>
            Coming Soon...
          </NavLink>
        </div>
        {/* <NavLink id={`craps-nav-link`} to={'/'}>
          Play Craps
        </NavLink>
        <NavLink id={`blackjack-nav-link`} to={'/'}>
          Play Blackjack
        </NavLink> */}
      </div>
    </div>
  )
}
