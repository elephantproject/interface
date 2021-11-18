import { Token } from 'elephantdexsdk'
import { PIT } from '../constants'
import { useActiveWeb3React } from './index'

export default function usePitToken(): Token | undefined {
  const { chainId } = useActiveWeb3React()
  return chainId ? PIT[chainId] : undefined
}
