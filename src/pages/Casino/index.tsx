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

export default function Casino() {
  return (
    <div className="w-full">
      <h1 className="text-center mb-10">Elephant Casino</h1>
      <div className="grid grid-cols-3 m-auto w-3/4 text-center bg-gray-100">
        <NavLink id={`stake-nav-link`} to={'/casino/dice'}>
          Play Dice
        </NavLink>
        <NavLink id={`craps-nav-link`} to={'/'}>
          Play Craps
        </NavLink>
        <NavLink id={`blackjack-nav-link`} to={'/'}>
          Play Blackjack
        </NavLink>
      </div>
    </div>
  )
}
