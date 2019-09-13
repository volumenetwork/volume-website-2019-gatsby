import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { slideInLeft } from '../../animation/animations'

import Twitter from '../../images/twitter.svg'
import Linkedin from '../../images/linkedin.svg'
import CloseSvg from '../../images/close.svg'

const MobileNavigation = ({ data, handleCloseNav, mobileNavActive }) => (
  <AnimatePresence>
    {mobileNavActive && (
      <Outer initial="hidden" animate={mobileNavActive ? 'visible' : 'hidden'} exit="exit" variants={slideInLeft}>
        <Close onClick={handleCloseNav}>
          <CloseIcon />
        </Close>
        <Nav>
          <ul>
            {data.wordpressWpApiMenusMenusItems.items.map((item, i) => (
              <li key={i}>
                <Link activeClassName="active" to={`/${item.object_slug}`} onClick={handleCloseNav}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </Nav>
        <Social>
          <SocialIcon target="_blank" href="https://www.linkedin.com/company/volume-network/" rel="noopener noreferrer">
            <Linkedin />
          </SocialIcon>
          <SocialIcon target="_blank" href="https://twitter.com/volume_network" rel="noopener noreferrer">
            <Twitter />
          </SocialIcon>
        </Social>
      </Outer>
    )}
  </AnimatePresence>
)

export default props => (
  <StaticQuery
    query={graphql`
      query MobileHeadingQuery {
        wordpressWpApiMenusMenusItems(wordpress_id: { eq: 2 }) {
          items {
            title
            object_slug
          }
        }
      }
    `}
    render={data => <MobileNavigation data={data} {...props} />}
  />
)

const Social = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  bottom: 15%;
  left: 0;
  right: 0;
  margin: 0 auto;
`

const SocialIcon = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.5rem;
  height: 4.5rem;
  border: 1px solid #fff;
  border-radius: 50%;
  margin-left: 1.5rem;

  svg {
    width: 2rem;
    height: 2rem;
    fill: #fff;
    stroke: #fff;
  }
`

const Outer = styled(motion.aside)`
  position: fixed;
  display: none;
  top: 0%;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(0deg, ${props => props.theme.colours.gradientEnd} 0%, ${props => props.theme.colours.gradientStart} 100%);
  z-index: 60;

  @media (max-width: 750px) {
    display: block;
  }
`

const Nav = styled.nav`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: all;

  ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    text-align: center;
    margin: 0;
  }

  li {
    margin: 0 1.8rem;
  }

  a {
    font-size: 10vw;
    line-height: 1.5;
    font-weight: 700;
    text-decoration: none;
    color: #fff;
    padding-bottom: 0.3rem;
    border-bottom: 0.2rem solid transparent;

    &.active {
      border-bottom: 0.2rem solid #fff;
    }
  }
`

const Close = styled(motion.button)`
  position: absolute;
  top: 2.5rem;
  right: 2rem;
  right: 2rem;
  width: 3rem;
  border: 0;
  background: transparent;
  padding: 0;
  will-change: transform;
  z-index: 10;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: 0;
  }
`

const CloseIcon = styled(CloseSvg)`
  width: 100%;
  height: 100%;

  line {
    stroke: #fff;
  }
`
