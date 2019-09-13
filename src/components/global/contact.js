import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Waypoint } from 'react-waypoint'
import { motion } from 'framer-motion'
import { staggeredFadeInUp } from '../../animation/animations'

export const fragment = graphql`
  fragment ContactFragment on WordPressAcf_contact_details {
    id
    offices {
      address
      title
    }
    email_addresses {
      title
      email_address
    }
    map {
      localFile {
        childImageSharp {
          fluid(maxWidth: 1500, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    google_maps_link
  }
`

const Contact = ({ offices, email_addresses: emailAddresses, map, google_maps_link: googleMapsLink }) => {
  const [animation, setAnimation] = useState(undefined)
  const handleAnimation = () => setAnimation(true)

  return (
    <Outer>
      <Waypoint onEnter={() => handleAnimation()} scrollableAncestor="window" bottomOffset="10%" />
      <Inner className="container" animate={animation ? 'visible' : 'hidden'} variants={staggeredFadeInUp.parent}>
        <Left>
          <LocationsList className="container">
            {offices.map((location, i) => (
              <Location key={i} variants={staggeredFadeInUp.child}>
                <Title>{location.title}</Title>
                {location.address && <p dangerouslySetInnerHTML={{ __html: location.address }} />}
              </Location>
            ))}
          </LocationsList>
          <EmailAddresses className="container">
            {emailAddresses.map((email, i) => (
              <EmailAddress key={i} variants={staggeredFadeInUp.child}>
                {email.title}: <a href={`mailto:${email.email_address}`}>{email.email_address}</a>
              </EmailAddress>
            ))}
          </EmailAddresses>
        </Left>
        <Right>
          <motion.a href={googleMapsLink} target="_blank" rel="noopener noreferrer" variants={staggeredFadeInUp.child}>
            <Img fluid={map.localFile.childImageSharp.fluid} />
          </motion.a>
        </Right>
      </Inner>
    </Outer>
  )
}

export default Contact

const Outer = styled.section`
  padding: 12.5rem 0;

  @media (max-width: 1100px) {
    padding: 3rem 0;
  }
`

const Inner = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const Left = styled.div`
  width: 50%;
  padding: 3rem 0;

  @media (max-width: 1100px) {
    width: 100%;
  }
`

const Right = styled.div`
  position: relative;
  width: 50%;

  @media (max-width: 1100px) {
    width: 100%;

    .gatsby-image-wrapper {
      width: calc(100% + 60px);
      transform: translateX(-30px);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 2rem;
    left: -2rem;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colours.secondary};
    background: linear-gradient(0deg, ${props => props.theme.colours.gradientEnd} 0%, ${props => props.theme.colours.gradientStart} 100%);
    z-index: -1;

    @media (max-width: 1100px) {
      display: none;
    }
  }
`

const LocationsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;

  @media (max-width: 1100px) {
    margin-bottom: 0;
  }

  > * {
    width: 48%;

    @media (max-width: 550px) {
      width: 100%;
    }
  }
`

const Location = styled(motion.div)`
  margin: 3rem 0;

  @media (max-width: 1100px) {
    margin-bottom: 3rem;
  }

  p {
    font-size: 1.8rem;
    line-height: 1.8;
    color: ${props => props.theme.colours.black};
    margin: 0;
  }
`

const Title = styled.h3`
  font-size: 2.8rem;
  line-height: 1.5;
  font-size: 700;
  margin-bottom: 0;
  color: ${props => props.theme.colours.primary};
`

const EmailAddresses = styled.div`
  width: 100%;
  margin: 6rem 0 4rem;
`

const EmailAddress = styled(motion.p)`
  && {
    font-size: 2.2rem;
    line-height: 1.5;
    font-weight: 700;
    color: ${props => props.theme.colours.primary};
    margin: 0 0 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: ${props => props.theme.colours.orangeDark};
    text-decoration: none;
    font-weight: 400;
  }
`
