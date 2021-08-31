import { Interface } from '@ethersproject/abi'
import { abi as PIT_ABI } from '@elephantdefi/contracts/build/Pit.json'

const PIT_INTERFACE = new Interface(PIT_ABI)

export default PIT_INTERFACE
export { PIT_ABI, PIT_INTERFACE }
