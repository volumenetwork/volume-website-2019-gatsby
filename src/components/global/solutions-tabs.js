import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import BackgroundSvg from '../../images/background-v.svg'
import SolutionsTabsContent from './solutions-tabs-content'
import SolutionsTabsTitle from './solutions-tabs-title'

export const fragment = graphql`
  fragment SolutionsTabsFragment on WordPressAcf_solutions_tabs {
    id
    main_title
    solutions {
      box_text
      box_title
      button_link
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      link_title
    }
  }
`

const SolutionsTabs = ({ main_title: mainTitle, solutions }) => {
  const [tabActive, setTabActive] = useState(0)

  return (
    <Outer className="Outer">
      <Inner>
        <SectionTitle>{mainTitle}</SectionTitle>
        <MainContainer>
          <Titles>
            <ul>
              {solutions.map((solution, i) => (
                <SolutionsTabsTitle title={solution.link_title} key={i} i={i} tabActive={tabActive} setTabActive={setTabActive} />
              ))}
            </ul>
          </Titles>
          <MainContent>
            {solutions.map((solution, i) => (
              <SolutionsTabsContent content={solution} key={i} i={i} tabActive={tabActive} setTabActive={setTabActive} numberOfTabs={solutions.length} />
            ))}
          </MainContent>
        </MainContainer>
      </Inner>
      <BackgroundV>
        <BackgroundSvg />
      </BackgroundV>
      <Background />
    </Outer>
  )
}

export default SolutionsTabs

const BackgroundV = styled.div`
  position: absolute;
  bottom: 0;
  left: -20%;
  height: 100%;
  z-index: 3;

  svg {
    height: 100%;
  }
`

const Outer = styled.section`
  position: relative;
  padding: 10rem;

  @media (max-width: 1100px) {
    padding: 4rem 0 5rem;
  }
`

const Inner = styled.div`
  width: 100%;
  margin: 0 auto;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  height: 100%;
  background: linear-gradient(0deg, ${props => props.theme.colours.gradientEnd} 0%, ${props => props.theme.colours.gradientStart} 100%);
  z-index: 1;

  @media (max-width: 1100px) {
    width: 100%;
  }
`

const SectionTitle = styled.h2`
  position: relative;
  font-family: ${props => props.theme.fonts.lato};
  font-size: 3.3rem;
  line-height: 1.2;
  font-weight: 700;
  color: #fff;
  left: 0;
  right: 0;
  margin: 0 auto;
  transform: translateX(-25%);
  max-width: 56rem;
  z-index: 5;

  @media (max-width: 1350px) {
    left: 10%;
    right: auto;
    margin: 0;
    transform: translateX(0);
    font-size: 3rem;
  }

  @media (max-width: 1100px) {
    left: 0;
    text-align: center;
    max-width: 100%;
  }

  @media (max-width: 500px) {
    max-width: 30rem;
    margin: 0 auto;
  }
`

const MainContainer = styled.div`
  position: relative;
  display: flex;
  margin-top: 5rem;
  z-index: 5;

  @media (max-width: 1100px) {
    margin-top: 14rem;
  }

  @media (max-width: 900px) {
    justify-content: center;
  }

  @media (max-width: 750px) {
    justify-content: flex-start;
    margin-top: 10rem;
    padding: 30px;
  }
`

const MainContent = styled.div`
  position: relative;
  width: 30%;
  max-width: 47rem;
  z-index: 10;

  @media (max-width: 1300px) {
    width: 35%;
  }

  @media (max-width: 900px) {
    width: 100%;
    max-width: 40rem;
  }

  @media (max-width: 750px) {
    width: 90%;
  }
`

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 20%;
  margin: 0 5% 0 10%;

  @media (max-width: 1300px) {
    margin: 0 5% 0 5%;
  }

  @media (max-width: 900px) {
    display: none;
  }

  ul {
    list-style: none;
  }
`
