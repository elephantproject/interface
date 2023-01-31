// used to mark unsupported tokens, these are hosted lists of unsupported tokens
/**
 * @TODO add list from blockchain association
 */

export const UNSUPPORTED_LIST_URLS: string[] = []
const ELEPHANT_DEFAULT_LIST =
  'https://unpkg.com/elephantdexdefault-token-list@latest/build/elephantdefi-default.tokenlist.json'

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  ELEPHANT_DEFAULT_LIST,

  ...UNSUPPORTED_LIST_URLS // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [ELEPHANT_DEFAULT_LIST]
