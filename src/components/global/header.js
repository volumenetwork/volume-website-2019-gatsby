import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { of, fromEvent, animationFrameScheduler } from 'rxjs'
import { distinctUntilChanged, filter, map, pairwise, switchMap, throttleTime } from 'rxjs/operators'
import { useObservable } from 'rxjs-hooks'

import HeaderNavigation from './header-navigation'
import MobileNav from './mobile-navigation'

import Logo from '../../images/volume-network-logo.svg'
import Twitter from '../../images/twitter.svg'
import Linkedin from '../../images/linkedin.svg'
import MobileNavIconSvg from '../../images/mobile-nav-icon.svg'

const watchScrollDirection = () =>
  of(typeof window === 'undefined').pipe(
    filter(bool => !bool),
    switchMap(() => fromEvent(window, 'scroll', { passive: true })),
    throttleTime(0, animationFrameScheduler),
    map(() => window.pageYOffset),
    pairwise(),
    map(([previous, current]) => (current < previous ? 'Up' : 'Down')),
    distinctUntilChanged()
  )

const watchScrollPosition = () =>
  of(typeof window !== 'undefined').pipe(
    filter(Boolean),
    switchMap(() => fromEvent(window, 'scroll', { passive: true })),
    throttleTime(0, animationFrameScheduler),
    map(() => window.pageYOffset),
    pairwise(),
    map(([previous, current]) => (current < 10 ? 'Top' : 'NotTop')),
    distinctUntilChanged()
  )

const Header = () => {
  const scrollDirection = useObservable(watchScrollDirection, 'Up')
  const scrollTop = useObservable(watchScrollPosition, 'Top')
  const [mobileNavActive, setMobileNavActive] = useState(undefined)

  const handleOpenNav = () => {
    setMobileNavActive(true)
  }

  const handleCloseNav = () => {
    setMobileNavActive(false)
  }

  return (
    <>
      <MobileNavIcon onClick={() => handleOpenNav()} className={mobileNavActive ? 'hidden' : 'visisble'} />
      <HeaderOuter className={`${scrollDirection === 'Down' ? 'hidden' : 'visible'}`} data-top={scrollTop === 'Top' ? 'top' : 'not-top'}>
        <HeadingLink to="/" onClick={() => handleCloseNav()}>
          <Logo />
        </HeadingLink>
        <HeaderNavigation />
        <HeaderRight>
          <Phone>020 7492 1959</Phone>
          <SocialIcon target="_blank" href="https://www.linkedin.com/company/volume-network/" rel="noopener noreferrer">
            <Linkedin />
          </SocialIcon>
          <SocialIcon target="_blank" href="https://twitter.com/volume_network" rel="noopener noreferrer">
            <Twitter />
          </SocialIcon>
        </HeaderRight>
      </HeaderOuter>
      <MobileNav handleCloseNav={handleCloseNav} mobileNavActive={mobileNavActive} />
    </>
  )
}

export default Header

const MobileNavIcon = styled(MobileNavIconSvg)`
  position: fixed;
  top: 2.5rem;
  right: 2rem;
  width: 4rem;
  display: none;
  cursor: pointer;
  z-index: 101;
  transition: opacity 0.3s 0.8s ease;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  &.hidden {
    opacity: 0;
    transition: opacity 0.3s 0s ease;
    pointer-events: none;
  }

  @media (max-width: 750px) {
    display: block;
    top: 2.2rem;
  }
`

const HeaderOuter = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem;
  pointer-events: none;
  background: transparent;
  z-index: 100;
  transform: translate3d(0, 0, 0);
  transition: transform 250ms ease, padding 250ms ease, background 250ms ease;
  will-change: transform;
  background: ${props => props.theme.colours.gradientStart};

  @media (max-width: 750px) {
    padding: 1.5rem 3rem;
  }

  &.hidden {
    transform: translate3d(0, -100%, 0);
    transition: transform 250ms ease, padding 250ms ease, background 250ms ease;

    @media (max-width: 750px) {
      transform: translate3d(0, 0, 0);
    }
  }

  &[data-top='not-top'] {
    padding: 1rem 3rem;
    transition: transform 250ms ease, padding 250ms ease, background 250ms 250ms ease;

    @media (max-width: 750px) {
      padding: 1.5rem 3rem;
    }
  }

  &[data-top='top'] {
    background: transparent;
    transform: translate3d(0, 0, 0);
    transition: transform 250ms ease, padding 250ms ease, background 0ms ease;
  }
`

const HeadingLink = styled(Link)`
  width: 3.4rem;
  height: 4.6rem;
  color: #fff;
  text-decoration: none;
  pointer-events: all;

  svg {
    width: 100%;
    height: 100%;
  }
`

const SocialIcon = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid #fff;
  border-radius: 50%;
  margin-left: 1.5rem;
  pointer-events: all;

  @media (max-width: 750px) {
    display: none;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    fill: #fff;
    stroke: #fff;
  }
`

const Phone = styled.span`
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;

  @media (max-width: 750px) {
    display: none;
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`
