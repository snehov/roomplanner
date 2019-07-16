import React from 'react'
import { useGlobal,setGlobal, addReducer } from 'reactn'
import Modal from '../modal/Modal'


const WarningModal = ({onClose, closeModal}) => {
  const [warningModal] = useGlobal('warningModal')
  //const [warningModalContent] = useGlobal('warningModalContent')


    return (
      <Modal onClose={onClose} header={warningModal.header}  type="warning" confirmModal={onClose}>
       <p>{warningModal.content}</p>
      </Modal>
    )
  
}
export default WarningModal
