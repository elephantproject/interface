import { Interface } from '@ethersproject/abi'
import { abi as GOVERNANCE_TOKEN_ABI } from '@elephantdefi/contracts/build/GovernanceToken.json'

const GOVERNANCE_TOKEN_INTERFACE = new Interface(GOVERNANCE_TOKEN_ABI)

export default GOVERNANCE_TOKEN_INTERFACE
export { GOVERNANCE_TOKEN_ABI, GOVERNANCE_TOKEN_INTERFACE }
