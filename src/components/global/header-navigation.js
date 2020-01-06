import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Spanish from '../../images/es_ES.svg'

const HeaderNavigation = ({ data }) => (
  <Nav>
    <ul>
      {data.wordpressWpApiMenusMenusItems.items.map((item, i) => (
        <li key={i}>
          <Link activeClassName="active" to={`/${item.object_slug}`}>
            {item.title}
          </Link>
        </li>
      ))}
      <li>
        <Flag target="_blank" href="https://www.volumenetwork.es" rel="noopener noreferrer">
           <Spanish />
        </Flag>
      </li>
    </ul>
  </Nav>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        wordpressWpApiMenusMenusItems(wordpress_id: { eq: 2 }) {
          items {
            title
            object_slug
          }
        }
      }
    `}
    render={data => <HeaderNavigation data={data} {...props} />}
  />
)

const Nav = styled.nav`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: all;

  @media (max-width: 750px) {
    display: none;
  }

  ul {
    display: flex;
    list-style-type: none;
    margin: 0;
  }

  li {
    margin: 0 1.8rem;
  }

  a {
    font-size: 1.6rem;
    text-decoration: none;
    color: #fff;

    &:hover {
      &:after {
        transform: scaleX(1);
      }
    }

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background: #fff;
      transform: scaleX(0);
      transform-origin: center left;
      transition: transform 0.3s cubic-bezier(1, 0, 0, 1);
      margin-top: 0.5rem;
    }

    &.active {
      &:after {
        transform: scaleX(1);
      }
    }
  }
`

const Flag = styled.a`
  border: 1px solid black;
  
  svg {
    width: 100%;
  }
`
