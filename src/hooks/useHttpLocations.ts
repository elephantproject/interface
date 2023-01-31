import uriToHttp from '../utils/uriToHttp'

export default function useHttpLocations(uri: string | undefined): string[] {
  return uri ? uriToHttp(uri) : []
}
