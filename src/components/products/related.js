import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const Product = styled.div`
  p {
    font-family: 'Lato', sans-serif;
  }
`

const RelatedProducts = ({ relatedProducts }) => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage {
          edges {
            node {
              title
              path
              wordpress_id
            }
          }
        }
      }
    `}
    render={data => {
      const products = data.allWordpressPage.edges.filter(item => relatedProducts.includes(item.node.wordpress_id))

      if (products.length > 0) {
        return products.map((product, i) => (
          <Product key={i}>
            <p>
              Title: {product.node.title}
              <br />
              Path: {product.node.path}
            </p>
          </Product>
        ))
      }
    }}
  />
)

export default RelatedProducts
