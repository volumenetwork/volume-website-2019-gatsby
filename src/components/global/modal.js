import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn, fadeInUp } from '../../animation/animations'

import CloseSvg from '../../images/close.svg'

const Portal = ({ children }) => {
  const modalRoot = typeof window !== `undefined` ? document.body : null
  const el = typeof window !== `undefined` ? document.createElement('div') : null

  useEffect(() => {
    modalRoot.appendChild(el)
  }, [el, modalRoot])
  useEffect(() => () => modalRoot.removeChild(el))
  return createPortal(children, el)
}

const Modal = ({ children, handleModalClose, modalActive, ref }) => (
  <>
    {typeof window !== 'undefined' && (
      <>
        {modalActive && (
          <Portal ref={ref}>
            <AnimatePresence>
              <ModalOuter>
                <ModalInner initial="hidden" animate={modalActive ? 'visible' : 'hidden'} exit="exit" variants={fadeInUp}>
                  <Close onClick={handleModalClose} whileHover={{ rotate: 90, scale: 1.2 }}>
                    <CloseIcon />
                  </Close>
                  {children}
                </ModalInner>
                <ModalBackground onClick={handleModalClose} initial="hidden" animate={modalActive ? 'visible' : 'hidden'} exit="exit" variants={fadeIn} />
              </ModalOuter>
            </AnimatePresence>
          </Portal>
        )}
      </>
    )}
  </>
)

export default Modal

const ModalOuter = styled.aside`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`

const ModalInner = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 112rem;
  background: #fff;
  box-shadow: 0px 0px 5rem 0px rgba(0, 0, 0, 0.16);
  z-index: 10;
`

const ModalBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  will-change: opacity;
  z-index: 1;
`

const Close = styled(motion.button)`
  position: absolute;
  width: 2.1rem;
  height: 2.1rem;
  top: 2rem;
  right: 2rem;
  border: 0;
  background: transparent;
  padding: 0;
  will-change: transform;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`

const CloseIcon = styled(CloseSvg)`
  width: 100%;
  height: 100%;
`
