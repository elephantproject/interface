import React, { Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Earn from './Earn'
import '../index.css'
import MobileHeader from '../components/Header/MobileHeader'

import EarnArchived from './Earn/Archived'
import Manage from './Earn/Manage'
import Pit from './Pit'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import { PIT_SETTINGS } from '../constants'
import { useActiveWeb3React } from '../hooks'
import usePlatformName from '../hooks/usePlatformName'

import NFT from './NFT'

import ClipLoader from 'react-spinners/ClipLoader'
import NFTACCOUNT from './NFT/account'
import Unlock from './Unlock'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`

export default function App() {
  const { chainId } = useActiveWeb3React()
  const pitSettings = chainId ? PIT_SETTINGS[chainId] : undefined
  const platformName = usePlatformName()

  const screenwidth = window.innerWidth
  let ismobile
  if (screenwidth < 777) {
    ismobile = true
  } else {
    ismobile = false
  }

  useEffect(() => {
    document.title = platformName
  }, [])

  return (
    <Suspense
      fallback={
        <div className="grid h-screen place-items-center">
          <ClipLoader color="#f49050" />
        </div>
      }
    >
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        {ismobile ? <MobileHeader /> : <Header />}
        <Popups />
        <Polling />
        <Web3ReactManager>
          <Switch>
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/pool" component={Pool} />
            <Route exact strict path="/staking" component={Earn} />
            <Route exact strict path="/staking/archived" component={EarnArchived} />
            <Route exact strict path={pitSettings?.path} component={Pit} />
            <Route exact strict path="/nft" component={NFT} />
            <Route exact strict path="/nft/account" component={NFTACCOUNT} />
            <Route exact strict path="/unlock" component={Unlock} />

            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

            <Route exact strict path="/staking/:currencyIdA/:currencyIdB" component={Manage} />
            <Route component={RedirectPathToSwapOnly} />
          </Switch>
        </Web3ReactManager>
      </AppWrapper>
    </Suspense>
  )
}
