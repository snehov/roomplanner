import React from 'react'
import {
  BottomOverlay,
  ModalFrame,
  ModalHeadline,
  ModalFootline,
  HeaderText,
  Close,
  LeftTop,
  Content,
  ConfirmButton
} from './ModalStyled'

class Modal extends React.Component {
  constructor() {
    super()
    /* this.timer = setTimeout(this.autoClose, 5000)
    console.log("rimer", this.timer) */
  }
/* autoClose = evt =>{
  clearTimeout(this.timer)
  this.props.confirmModal()
} */
  stopBubbling = evt => {
    evt.stopPropagation()
    evt.cancelBubble = true
  }

  backOverlayClick = evt => {
    this.stopBubbling(evt)
    console.log('back overlay click')
    this.closeEvent()
  }
  closeModal = evt => {
    this.stopBubbling(evt)
    this.closeEvent()
  }
  closeEvent = () => {
    console.log('closin element')
    this.props.onClose()
  }
  render() {
    const{children, type, confirmButton, header, confirmModal}=this.props
    return (
      <BottomOverlay onClick={this.backOverlayClick}>
        <ModalFrame onClick={this.stopBubbling} type={type}>
          <ModalHeadline>
            <LeftTop />
            <HeaderText>{header}</HeaderText>
            <Close onClick={this.closeModal}>X</Close>
          </ModalHeadline>
          <Content defaultPadding>
          {children}
          </Content>
          <ModalFootline >
            {confirmModal && <ConfirmButton onClick={confirmModal}>OK</ConfirmButton>}
            </ModalFootline>
        </ModalFrame>
      </BottomOverlay>
    )
  }
}
export default Modal
