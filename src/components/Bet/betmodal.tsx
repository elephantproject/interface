import React from 'react'

import { Input as NumericalInput } from '../NumericalInput'

interface BetModalProps {
  value: string
  onUserInput: (value: string) => void
}

export default function BetModal({ value, onUserInput }: BetModalProps) {
  return (
    <NumericalInput
      className="token-amount-input"
      value={value}
      onUserInput={val => {
        onUserInput(val)
      }}
    />
  )
}
