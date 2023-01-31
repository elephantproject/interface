import React from 'react'
import styled from 'styled-components'
import Settings from '../Settings'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'

const StyledSwapHeader = styled.div`
  padding: 12px 1rem 0px 1.5rem;
`

export default function SwapHeader() {
  return (
    <StyledSwapHeader>
      <RowBetween>
        <TYPE.black>Swap</TYPE.black>
        <Settings />
      </RowBetween>
    </StyledSwapHeader>
  )
}
