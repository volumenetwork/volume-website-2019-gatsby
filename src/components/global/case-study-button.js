import React, { useState } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { aspectRatio } from '../helpers/mixins'

import Modal from './modal'

const CaseStudyButton = ({ caseStudy }) => {
  const [modalActive, setModalActive] = useState(false)

  const handleModalOpen = () => {
    setModalActive(true)
  }

  const handleModalClose = () => {
    setModalActive(false)
  }
  return (
    <>
      <Button className="button" onClick={handleModalOpen}>
        {caseStudy.title} case study
      </Button>

      <Modal handleModalOpen={handleModalOpen} handleModalClose={handleModalClose} modalActive={modalActive}>
        <ModalImage fluid={caseStudy.acf.project_details.image.localFile.childImageSharp.fluid} className="aspect" />
        <ModalText>
          <ModalSmallTitle>
            <span>Case study</span>
          </ModalSmallTitle>
          <ModalTitle>
            <span>{caseStudy.title}</span>
          </ModalTitle>
          <MainText dangerouslySetInnerHTML={{ __html: caseStudy.acf.project_details.main_text }} />
        </ModalText>
      </Modal>
    </>
  )
}

export default CaseStudyButton

const Button = styled.button`
  cursor: pointer;
  border: 0;
  margin-top: 1rem;

  &:focus {
    outline: 0;
  }
`

const ModalImage = styled(Img)`
  ${aspectRatio(450, 580)}
  width: 38%;

  @media (max-width: 750px) {
    display: none;
  }
`

const ModalText = styled.div`
  width: 62%;
  padding: 5rem;
  text-align: left;

  @media (max-width: 750px) {
    width: 100%;
  }
`

const ModalSmallTitle = styled.p`
  span {
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 800;
    letter-spacing: 0.3rem;
    margin-bottom: 2rem;
    text-transform: uppercase;
    opacity: 0.36;
  }
`

const ModalTitle = styled.p`
  span {
    font-size: 2.5rem;
    line-height: 1.4;
    font-weight: 800;
    letter-spacing: 0.1rem;
    color: ${props => props.theme.colours.secondary};
    margin-bottom: 0;
  }
`

const MainText = styled.div`
  p {
    font-size: 1.6rem;
    line-height: 1.75;

    strong {
      color: ${props => props.theme.colours.primary};
    }
  }

  li {
    font-size: 1.6rem;
    line-height: 1.75;
    color: ${props => props.theme.colours.grey};
    margin-bottom: 0.5rem;
  }
`
