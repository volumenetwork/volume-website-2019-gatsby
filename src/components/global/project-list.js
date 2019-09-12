import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Waypoint } from 'react-waypoint'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../animation/animations'
import { aspectRatio } from '../helpers/mixins'

import CaseStudyButton from './case-study-button'

export const fragment = graphql`
  fragment LatestProjectsFragment on WordPressAcf_latest_projects {
    id
    projects {
      id
      title
      wordpress_id
      acf {
        project_details {
          description
          main_text
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`

const ProjectsList = ({ projects }) => {
  const [animation, setAnimation] = useState(undefined)

  const handleAnimation = () => {
    setAnimation(true)
  }

  return (
    <>
      <Waypoint onEnter={() => handleAnimation()} scrollableAncestor="window" bottomOffset="10%" />
      {projects.map(project => (
        <Project key={project.id} animate={animation ? 'visible' : 'hidden'} variants={fadeInUp}>
          <Image fluid={project.acf.project_details.image.localFile.childImageSharp.fluid} className="aspect" />
          <Text>
            <Title>{project.title}</Title>
            <Description>{project.acf.project_details.description}</Description>
            <CaseStudyButton caseStudy={project} />
          </Text>
        </Project>
      ))}
    </>
  )
}

export default ProjectsList

const Project = styled(motion.article)`
  width: calc(50% - 2.5rem);
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;

  @media (max-width: 1400px) {
    width: calc(50% - 2rem);
  }

  @media (max-width: 750px) {
    width: 100%;
    max-width: 50rem;
    margin-bottom: 3rem;
  }

  &:last-child {
    margin-top: -5rem;
    height: calc(100% - 5rem);

    @media (max-width: 750px) {
      margin-top: 0;
      height: auto;
    }
  }
`

const Image = styled(Img)`
  width: 100%;
  ${aspectRatio(475, 280)}
`

const Text = styled.div`
  padding: 2rem 3rem 5rem;

  @media (max-width: 750px) {
    padding: 2rem 3rem 4rem;
  }
`

const Title = styled.h3`
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: 200;
  color: ${props => props.theme.colours.primary};
  line-height: 1.4;
  margin-bottom: 15px;

  @media (max-width: 750px) {
    font-size: 3rem;
  }
`

const Description = styled.p`
  font-size: 1.6rem;
  color: ${props => props.theme.colours.grey};
  line-height: 1.66;
  margin: 0 auto 3rem;

  @media (max-width: 750px) {
    margin-bottom: 1rem;
  }
`
