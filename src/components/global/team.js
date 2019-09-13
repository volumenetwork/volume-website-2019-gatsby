import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Waypoint } from 'react-waypoint'
import { motion, AnimatePresence } from 'framer-motion'
import { aspectRatio } from '../helpers/mixins'
import { staggeredFadeInUp, fadeIn, fadeInUp } from '../../animation/animations'

import CloseSvg from '../../images/close.svg'

export const fragment = graphql`
  fragment TeamFragment on WordPressAcf_team {
    id
    title
    hide
    people {
      biography
      name
      title
      photo {
        localFile {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`

const Team = ({ title, people, hide }) => {
  const [modalActive, setModalActive] = useState(false)
  const [modalPhoto, setModalPhoto] = useState(undefined)
  const [modalName, setModalName] = useState(undefined)
  const [modalTitle, setModalTitle] = useState(undefined)
  const [modalBio, setModalBio] = useState(undefined)
  const [animation, setAnimation] = useState(undefined)

  const handleModalOpen = person => {
    setModalActive(true)
    setModalPhoto(person.photo.localFile.childImageSharp.fluid)
    setModalName(person.name)
    setModalTitle(person.title)
    setModalBio(person.biography)
  }

  const handleModalClose = () => {
    setModalActive(false)
  }

  const handleAnimation = () => {
    setAnimation(true)
  }

  return (
    <>
      <Outer className="Outer" data-hidden={hide ? 'hidden' : 'visible'}>
        <Waypoint onEnter={() => handleAnimation()} scrollableAncestor="window" bottomOffset="10%" />
        <Inner className="container">
          <Title>{title}</Title>
          <People initial="hidden" animate={animation ? 'visible' : 'hidden'} variants={staggeredFadeInUp.parent}>
            {people.map((person, i) => (
              <Person onClick={() => handleModalOpen(person)} key={i} variants={staggeredFadeInUp.child}>
                <Photo fluid={person.photo.localFile.childImageSharp.fluid} className="aspect" />
              </Person>
            ))}
          </People>
        </Inner>
      </Outer>

      <AnimatePresence>
        {modalActive && (
          <ModalOuter>
            <ModalInner initial="hidden" animate={animation ? 'visible' : 'hidden'} exit="exit" variants={fadeInUp}>
              <Close onClick={handleModalClose} whileHover={{ rotate: 90, scale: 1.2 }}>
                <CloseIcon />
              </Close>
              <ModalPhoto>
                <Photo fluid={modalPhoto} className="aspect" />
              </ModalPhoto>
              <ModalText>
                <ModalSmallTitle>Profile</ModalSmallTitle>
                <ModalName>{modalName}</ModalName>
                <ModalTitle>{modalTitle}</ModalTitle>
                <ModalBio dangerouslySetInnerHTML={{ __html: modalBio }} />
              </ModalText>
            </ModalInner>
            <ModalBackground onClick={handleModalClose} initial="hidden" animate={animation ? 'visible' : 'hidden'} exit="exit" variants={fadeIn} />
          </ModalOuter>
        )}
      </AnimatePresence>
    </>
  )
}

export default Team

const Outer = styled.section`
  padding: 10rem 0;
  background: linear-gradient(0deg, ${props => props.theme.colours.gradientEnd} 0%, ${props => props.theme.colours.gradientStart} 100%);

  &[data-hidden='hidden'] {
    display: none;
  }

  @media (max-width: 750px) {
    padding: 5rem 0;
  }
`

const Inner = styled(motion.div)`
  text-align: center;
`

const Title = styled.p`
  font-size: 3.2rem;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: 0.01rem;
  color: #fff;
`

const People = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1.2rem;
`

const Photo = styled(Img)`
  width: 100%;
  ${aspectRatio(1, 1)}
`

const Person = styled(motion.button)`
  border: 0;
  background: 0;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`

const ModalOuter = styled.aside`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`

const ModalInner = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 100rem;
  padding: 5rem;
  background: #fff;
  box-shadow: 0px 0px 5rem 0px rgba(0, 0, 0, 0.16);
  z-index: 10;
`

const ModalBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  will-change: opacity;
  z-index: 1;
`

const ModalPhoto = styled.div`
  width: 38%;

  @media (max-width: 750px) {
    display: none;
  }
`

const ModalText = styled.div`
  width: 55%;

  @media (max-width: 750px) {
    width: 100%;
  }
`

const ModalName = styled.p`
  font-size: 2.5rem;
  line-height: 1.4;
  font-weight: 800;
  letter-spacing: 0.1rem;
  color: ${props => props.theme.colours.secondary};
  margin-bottom: 0;
`

const ModalSmallTitle = styled.p`
  font-size: 1rem;
  line-height: 1.4;
  font-weight: 800;
  letter-spacing: 0.3rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  opacity: 0.36;
`

const ModalTitle = styled.p`
  font-size: 1.8rem;
  line-height: 1.4;
  font-weight: 700;
  color: ${props => props.theme.colours.primary};
`

const ModalBio = styled.p`
  position: relative;
  font-size: 1.6rem;
  line-height: 1.75;
  margin-bottom: 3rem;

  &::after {
    content: '';
    position: absolute;
    bottom: -3rem;
    left: 0;
    width: 2rem;
    height: 0.2rem;
    margin: 0 auto;
    background: #00d4d4;
  }
`

const Close = styled(motion.button)`
  position: absolute;
  width: 2.1rem;
  height: 2.1rem;
  top: 2rem;
  right: 2rem;
  border: 0;
  background: transparent;
  padding: 0;
  will-change: transform;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`

const CloseIcon = styled(CloseSvg)`
  width: 100%;
  height: 100%;
`
