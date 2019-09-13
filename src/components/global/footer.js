import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, Link } from 'gatsby'

import VolumeLogo from '../../images/volume-network-logo.svg'
import KotaLogo from '../../images/kota-logo.svg'
import Twitter from '../../images/twitter.svg'
import Linkedin from '../../images/linkedin.svg'

const Footer = ({ data }) => (
  <PageFooter>
    <div className="container">
      <Slogan>{data.wordpressAcfOptions.global_options.slogan}</Slogan>
      <FooterTop>
        <FooterLogoWrap>
          <VolumeLogo />
        </FooterLogoWrap>
        <Nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {data.wordpressWpApiMenusMenusItems.items.map((item, i) => (
              <li key={i}>
                <Link to={`/${item.object_slug}`} activeClassName="active">
                  {item.title}
                </Link>
                {item.wordpress_children &&
                  item.wordpress_children.map((subitem, key) => (
                    <ul key={key}>
                      <li>
                        <Link to={subitem.url}>{subitem.title}</Link>
                      </li>
                    </ul>
                  ))}
              </li>
            ))}
          </ul>
        </Nav>
        <Phone>
          <p>Get in touch</p>
          <p>{data.wordpressAcfOptions.global_options.phone_number}</p>
        </Phone>
      </FooterTop>
      <FooterBottom>
        <SocialCopyright>
          <SocialWrap>
            <SocialIcon target="_blank" href="https://www.linkedin.com/company/volume-network/" rel="noopener noreferrer">
              <Linkedin />
            </SocialIcon>
            <SocialIcon target="_blank" href="https://twitter.com/volume_network" rel="noopener noreferrer">
              <Twitter />
            </SocialIcon>
          </SocialWrap>
          <p>
            <span>&copy; {new Date().getFullYear()} Volume. All Rights Reserved</span>
          </p>
        </SocialCopyright>
        <Kota>
          <a href="https://kota.co.uk" target="_blank" rel="noopener noreferrer">
            <span>Website by</span>
            <KotaLogo />
          </a>
        </Kota>
      </FooterBottom>
    </div>
  </PageFooter>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        wordpressWpApiMenusMenusItems(wordpress_id: { eq: 3 }) {
          items {
            title
            object_slug
            wordpress_children {
              title
              url
            }
          }
        }
        wordpressAcfOptions {
          global_options {
            slogan
            offices {
              title
              phone_number
            }
            phone_number
          }
        }
      }
    `}
    render={data => <Footer data={data} {...props} />}
  />
)

const PageFooter = styled.footer`
  position: relative;
  background: ${props => props.theme.colours.gradientStart};
  background: linear-gradient(187deg, ${props => props.theme.colours.gradientStart} 0%, ${props => props.theme.colours.gradientEnd} 100%);
  color: #fff;
  padding: 6.5rem 0 8rem;
  z-index: 1;

  @media (max-width: 1000px) {
    padding: 3rem 0 4rem;
  }
`

const FooterTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: 850px) {
    justify-content: space-between;
  }

  svg {
    width: 9.4rem;
    height: 12.5rem;
  }
`

const FooterLogoWrap = styled.div`
  width: 10%;
  margin-right: 5%;
  transform: translateY(-4%);

  @media (max-width: 650px) {
    width: 50%;
    margin: 0;
  }
`

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  margin-top: 4rem;

  @media (max-width: 850px) {
    align-items: flex-end;
  }
`

const Kota = styled.div`
  a {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color: #fff;
    -webkit-tap-highlight-color: transparent;

    @media (max-width: 850px) {
      transform: translateY(25%);
    }

    span {
      @media (max-width: 850px) {
        display: none;
      }
    }
  }

  svg {
    margin-left: 1.5rem;
  }
`

const Nav = styled.nav`
  display: flex;
  width: 60%;

  @media (max-width: 950px) {
    width: 70%;
  }

  @media (max-width: 650px) {
    width: 50%;
  }

  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    list-style-type: none;
    margin: 0;

    ul {
      @media (max-width: 650px) {
        display: none;
      }

      a {
        opacity: 0.5;
      }
    }
  }

  li {
    margin: 0 0 1.5rem;

    @media (max-width: 650px) {
      width: 50%;
    }
  }

  a {
    display: block;
    font-size: 1.4rem;
    font-weight: 700;
    text-decoration: none;
    color: #fff;
    margin-bottom: 2rem !important;
    -webkit-tap-highlight-color: transparent;
  }
`

const Phone = styled.div`
  width: 20%;
  text-align: right;
  margin-left: auto;

  @media (max-width: 950px) {
    width: 100%;
    margin-top: 3rem;
  }

  @media (max-width: 650px) {
    text-align: left;
  }

  p {
    color: #fff;
    line-height: 1.65;

    &:first-child {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    &:last-child {
      font-size: 1.8rem;
      font-weight: 300;
      margin: 0;
    }
  }
`

const SocialWrap = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: 850px) {
    width: 100%;
    margin-bottom: 4rem;
  }
`

const SocialIcon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid #fff;
  border-radius: 50%;
  margin-right: 1.5rem;

  @media (max-width: 850px) {
    width: 5rem;
    height: 5rem;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    fill: #fff;
    stroke: #fff;

    @media (max-width: 850px) {
      width: 2rem;
      height: 2rem;
    }
  }
`

const SocialCopyright = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  p {
    color: #fff;
    margin: 0;

    @media (max-width: 850px) {
      width: 100%;
    }
  }
`

const Slogan = styled.p`
  font-size: 3.5rem;
  font-weight: 300;
  line-height: 1.3;
  text-align: center;
  color: #fff;
  padding-bottom: 6.5rem;
  margin-bottom: 7rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.17);

  @media (max-width: 1000px) {
    padding-bottom: 3rem;
  }
`
