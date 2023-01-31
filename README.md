# Elephant Interface



An open source interface for Elephant Dex -- a protocol for decentralized exchange of Harmony HRC20 tokens.

- Website: [elephant.ac](https://elephant.ac)
- Interface: [elephant.ac](https://elephant.ac)
- Twitter: [@elephant_dex](https://twitter.com/elephant_dex)
- Email: [admin@elephant.ac](mailto:contact@uniswap.org)
- Discord: [Elephant](https://discord.gg/ESJsrCguDH)
- Whitepaper: [Link](https://medium.com/@elephantdex?p=e86bfee371e7)

## Accessing a Local Elephant Interface

To access the Elephant Interface follow the instructions below

## Listing a token

Please see the
[elephantdexdefault-token-list](https://github.com/elephantproject/default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[Uniswap V2](https://uniswap.org/docs/v2/smart-contracts/factory/) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.** 
CI checks will run against all PRs.

# interface

Change Sourcemap

--

go into node_modules/react-scripts/config webpack.config.js and change devtool:"source-map" to devtool:"hidden-nosources-source-map"   

