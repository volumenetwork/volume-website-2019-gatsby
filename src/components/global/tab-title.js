import React from 'react'
import styled from 'styled-components'

import ActiveArrowSvg from '../../images/active-arrow.svg'

const TabTitle = ({ title, i, tabActive, setTabActive }) => (
  <ListElement className={tabActive === i ? 'active' : ''}>
    <TabTitleButton onClick={() => setTabActive(i)} className={tabActive === i ? 'active' : ''}>
      {tabActive === i && <ActiveArrow />}
      {title}
    </TabTitleButton>
  </ListElement>
)

export default TabTitle

const TabTitleButton = styled.button`
  position: relative;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.01rem;
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  color: #c2c3c6;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colours.secondary};
  }

  &:focus {
    outline: 0;
  }

  &.active {
    color: ${props => props.theme.colours.secondary};
  }
`

const ListElement = styled.li`
  margin: 0 0.5rem;
  padding: 1.2rem 1.2rem 1.2rem 3rem;
  border: 1px solid transparent;

  &.active {
    border: 1px solid #dadbde;

    @media (max-width: 750px) {
      border: 0;
    }
  }
`
const ActiveArrow = styled(ActiveArrowSvg)`
  position: absolute;
  left: -2rem;
  top: 0rem;
  width: 1.4rem;
  height: 1.4rem;

  @media (max-width: 750px) {
    display: none;
  }
`
