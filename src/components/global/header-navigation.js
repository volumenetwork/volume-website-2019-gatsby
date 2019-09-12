import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const HeaderNavigation = ({ data }) => (
  <Nav>
    <ul>
      {data.wordpressWpApiMenusMenusItems.items.map((item, i) => (
        <li key={i}>
          <Link activeClassName="active" to={`/${item.object_slug}`} exit={{ length: 1 }} entry={{ length: 1 }}>
            {item.title}
          </Link>
        </li>
      ))}
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
    padding-bottom: 0.8rem;
    border-bottom: 0.2rem solid transparent;

    &.active {
      border-bottom: 0.2rem solid #fff;
    }
  }
`
