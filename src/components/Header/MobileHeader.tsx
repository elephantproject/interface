import { TokenAmount } from 'elephantdexsdk'
import React, { useState } from 'react'
import { Text } from 'rebass'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import useUSDPrice from '../../hooks/useUSDPrice'

import styled from 'styled-components'

import menu from '../../assets/svg/menu.svg'
import menudark from '../../assets/svg/menudark.svg'

import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances, useAggregateGovTokenBalance } from '../../state/wallet/hooks'
import { CardNoise } from '../earn/styled'
import { CountUp } from 'use-count-up'
import { TYPE } from '../../theme'

import { Moon, Sun } from 'react-feather'
import Menu from '../Menu'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import Modal from '../Modal'
import GovTokenBalanceContent from './GovTokenBalanceContent'
import usePrevious from '../../hooks/usePrevious'
import { BASE_CURRENCY } from '../../connectors'
import { PIT_SETTINGS } from '../../constants'
import useGovernanceToken from '../../hooks/useGovernanceToken'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

const HeaderLinks = styled(Row)`
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem 0 1rem 1rem;
    justify-content: flex-end;
    display: block;
`};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: s;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(
    76.02% 75.41% at 1.84% 0%,
    ${({ theme }) => theme.tokenButtonGradientStart} 0%,
    ${({ theme }) => theme.tokenButtonGradientEnd} 100%
  );
`

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Price = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`
const MobileModal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(232, 117, 23, 0.06);
`

const UniIcon = styled.div``

export const StyledMenuButton = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  margin-top: 9px;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1.5rem;
  width: fit-content;
  margin: 0.5rem 9px;
  font-weight: 700;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

export default function MobileHeader() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const govToken = useGovernanceToken()

  const govTokenPrice = useUSDPrice(govToken)

  const pitSettings = chainId ? PIT_SETTINGS[chainId] : undefined

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  // const [isDark] = useDarkModeManager()
  const [darkMode, toggleDarkMode] = useDarkModeManager()

  const aggregateBalance: TokenAmount | undefined = useAggregateGovTokenBalance()

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)

  const countUpValue = aggregateBalance?.toFixed(0) ?? '0'
  const countUpValuePrevious = usePrevious(countUpValue) ?? '0'

  const [open, setopen] = useState(false)

  function handleopen() {
    setopen(!open)
  }
  function handleclose() {
    setopen(!open)
  }

  let hidden: string | undefined
  if (open === true) {
    hidden = 'visible'
  } else {
    hidden = 'hidden'
  }

  return (
    <div className="w-full">
      <HeaderFrame>
        <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
          <GovTokenBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
        </Modal>
        <HeaderRow>
          <Title>
            <UniIcon onClick={handleopen}>
              <img width={'48px'} src={darkMode ? menudark : menu} alt="logo" />
            </UniIcon>
          </Title>
        </HeaderRow>
        <HeaderControls>
          <HeaderElement>
            {aggregateBalance && (
              <UNIWrapper onClick={() => setShowUniBalanceModal(true)}>
                <UNIAmount active={!!account} style={{ pointerEvents: 'auto' }}>
                  {account && (
                    <TYPE.white
                      style={{
                        paddingRight: '.4rem'
                      }}
                    >
                      <CountUp
                        key={countUpValue}
                        isCounting
                        start={parseFloat(countUpValuePrevious)}
                        end={parseFloat(countUpValue)}
                        thousandsSeparator={','}
                        duration={1}
                      />
                    </TYPE.white>
                  )}
                  {govToken?.symbol}
                </UNIAmount>
              </UNIWrapper>
            )}
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} {BASE_CURRENCY.symbol}
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
        </HeaderControls>
      </HeaderFrame>
      <MobileModal className={hidden}>
        <HeaderLinks>
          <StyledNavLink onClick={handleclose} id={`swap-nav-link`} to={'/swap'}>
            {t('swap')}
          </StyledNavLink>
          <StyledNavLink
            onClick={handleclose}
            id={`pool-nav-link`}
            to={'/pool'}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/create') ||
              pathname.startsWith('/find')
            }
          >
            {t('pool')}
          </StyledNavLink>
          <StyledNavLink onClick={handleclose} id={`stake-nav-link`} to={'/staking'}>
            Staking
          </StyledNavLink>
          <StyledNavLink onClick={handleclose} id={`stake-nav-link`} to={`${pitSettings?.path}`}>
            {pitSettings?.name}
          </StyledNavLink>
          <a
            rel="noreferrer"
            target="_blank"
            className="text-2xl m-2.5 font-bold block	"
            href="https://elephantinfo.ac/"
          >
            Analytics
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            className="text-2xl m-2.5 font-bold block		"
            href="https://discord.gg/Dyd5t4SESH"
          >
            Discord
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            className="text-2xl m-2.5 font-bold text-red-500	block	"
            href="https://elephant.ac/casino"
          >
            Casino
          </a>

          <HeaderElementWrap>
            <StyledMenuButton onClick={() => toggleDarkMode()}>
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </StyledMenuButton>
          </HeaderElementWrap>
          <div className="text-center container pt-12">
            <h2>🐘 Live Price 🐘</h2>
            <Price className="text-green-500">${govTokenPrice?.toFixed(9) ?? '-'}</Price>
          </div>
        </HeaderLinks>
      </MobileModal>
    </div>
  )
}
