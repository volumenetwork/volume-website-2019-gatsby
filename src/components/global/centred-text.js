import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

export const fragment = graphql`
  fragment CentredTextFragment on WordPressAcf_centred_text {
    id
    text
  }
`

const CentredText = ({ text }) => (
  <Outer className="Outer">
    <Inner>
      <p>{text}</p>
    </Inner>
  </Outer>
)

export default CentredText

const Outer = styled.section`
  background: ${props => props.theme.colours.blueBackground};
  padding: 12.5rem;
`

const Inner = styled.div`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;

  p {
    position: relative;
    font-size: 2.8rem;
    line-height: 1.4;
    font-weight: 300;
    text-align: center;
    color: ${props => props.theme.colours.black};

    &::after {
      content: '';
      position: absolute;
      bottom: -3rem;
      left: 0;
      right: 0;
      width: 2rem;
      height: 0.2rem;
      margin: 0 auto;
      background: ${props => props.theme.colours.secondary};
    }
  }
`
