import React, { useState } from 'react'
import styled from 'styled-components'
import { Waypoint } from 'react-waypoint'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../animation/animations'

import ProjectList from './project-list'

const LastestProjects = ({ projects }) => {
  const [animation, setAnimation] = useState(undefined)

  const handleAnimation = () => {
    setAnimation(true)
  }

  return (
    <Container className="container">
      <Waypoint onEnter={() => handleAnimation()} scrollableAncestor="window" bottomOffset="10%" />
      <Title animate={animation ? 'visible' : 'hidden'} variants={fadeInUp}>
        Featured Projects
      </Title>
      <ProjectsWrapper>
        <ProjectList projects={projects} />
      </ProjectsWrapper>
    </Container>
  )
}

export default LastestProjects

const Container = styled.section`
  margin: 12rem auto;
  max-width: 106rem;

  @media (max-width: 750px) {
    margin: 5rem auto;
  }
`

const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 750px) {
    justify-content: center;
  }
`

const Title = styled(motion.p)`
  font-size: 4rem;
  line-height: 1.2;
  font-weight: 800;
  margin-bottom: 5rem;
  color: ${props => props.theme.colours.primary};

  @media (max-width: 750px) {
    font-size: 3rem;
    margin-bottom: 3rem;
    text-align: center;
  }

  @media (max-width: 510px) {
    text-align: left;
  }
`
