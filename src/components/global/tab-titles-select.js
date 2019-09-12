import React from 'react'
import styled from 'styled-components'

const TabTitleSelect = ({ title, i }) => (
  <ListElement value={i} label={title}>
    {title}
  </ListElement>
)

const ListElement = styled.option`
  margin: 0;
`

export default TabTitleSelect
