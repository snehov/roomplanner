import React from 'react'
import Modal from '../modal/Modal'

class BookingModal extends React.Component {
  /* static props ={
    closeModal:Prop
  } */
  constructor() {
    super()
  }

  render() {
    return (
      <Modal onClose={this.props.onClose} header="booking modal">
        obsah modalu s nejekym<button onClick={this.props.closeModal}>tlacitkem</button>
      </Modal>
    )
  }
}
export default BookingModal
