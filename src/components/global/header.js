import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { of, fromEvent, animationFrameScheduler } from 'rxjs'
import { distinctUntilChanged, filter, map, pairwise, switchMap, tap, throttleTime } from 'rxjs/operators'
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
    map(([previous, current]) => (current === 0 ? 'Top' : 'NotTop')),
    distinctUntilChanged(),
    tap(console.log)
  )

const Header = () => {
  const scrollDirection = useObservable(watchScrollDirection, 'Up')
  const scrollTop = useObservable(watchScrollPosition, 'Top')
  // console.log('TCL: Header -> scrollTop', scrollTop)
  const [mobileNavActive, setMobileNavActive] = useState(undefined)

  const handleOpenNav = () => {
    setMobileNavActive(true)
  }

  const handleCloseNav = () => {
    setMobileNavActive(false)
  }

  return (
    <>
      <MobileNavIcon onClick={() => handleOpenNav()} />
      <HeaderOuter className={`${scrollDirection === 'Down' && 'hidden'}`} data-top={scrollTop === 'Top' ? 'top' : 'not-top'}>
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
  position: absolute;
  top: 2.5rem;
  right: 2rem;
  width: 4rem;
  display: none;
  cursor: pointer;
  z-index: 10;

  @media (max-width: 750px) {
    display: block;
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
  transition: all 250ms ease;
  will-change: transform;
  background: ${props => props.theme.colours.primary};

  &.hidden {
    transform: translate3d(0, -100%, 0);
    transition: mdc-animation-enter(transform, 200ms);
  }

  &[data-top='not-top'] {
    padding: 1rem 3rem;
  }

  @media (max-width: 750px) {
    padding: 2rem 3rem;
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
