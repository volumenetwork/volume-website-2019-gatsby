import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { drawLine } from '../../animation/animations'

const SolutionsTabsTitle = ({ title, i, tabActive, setTabActive }) => (
  <ListElement className={tabActive === i ? 'active' : ''}>
    <TabTitleButton onClick={() => setTabActive(i)} className={tabActive === i ? 'active' : ''}>
      {title}
      {tabActive === i && <ActiveLine initial="hidden" animate="visible" variants={drawLine} />}
    </TabTitleButton>
  </ListElement>
)

export default SolutionsTabsTitle

const TabTitleButton = styled.button`
  position: relative;
  font-size: 3rem;
  line-height: 1.6;
  font-weight: 300;
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  color: #fff;
  transition: opacity 0.3s ease;
  cursor: pointer;

  @media (max-width: 1100px) {
    font-size: 2.5rem;
  }

  &:focus {
    outline: 0;
  }

  &:hover {
    opacity: 0.6;
  }

  &.active {
    color: ${props => props.theme.colours.secondary};

    &:hover {
      opacity: 1;
    }
  }
`

const ListElement = styled.li`
  position: relative;
  text-align: right;
`

const ActiveLine = styled(motion.div)`
  display: block;
  position: absolute;
  top: 50%;
  width: 10rem;
  height: 0.2rem;
  background: #fff;
  transform: translate(12rem, 50%) scaleY(0);
  transform-origin: center left;
  right: 0;
`
