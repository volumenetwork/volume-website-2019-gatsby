import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <Outer>
    <Inner className="container">
      <h1>404</h1>
      <h2>Sorry, the page you're looking for can't be found.</h2>
      <p>
        <Link to="/">Click here to go home</Link>
      </p>
    </Inner>
  </Outer>
)

export default NotFoundPage

const Outer = styled.section`
  background: ${props => props.theme.colours.primary};
  background: linear-gradient(0deg, ${props => props.theme.colours.gradientEnd} 0%, ${props => props.theme.colours.gradientStart} 100%);
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;

  h1 {
    font-size: 8rem;
    line-height: 1.2;
    color: ${props => props.theme.colours.secondary};
  }

  h2 {
    font-size: 3.6rem;
    line-height: 1.3;
    color: #fff;
    max-width: 46rem;
  }

  p {
    font-size: 1.8rem;
    margin-top: 5rem;

    a {
      color: #fff;
      text-decoration: none;
      border-bottom: 1px solid #fff;
      padding-bottom: 0.5rem;

      &:hover {
        border-bottom: 0;
      }
    }
  }
`
