import { useGlobal, setGlobal, addReducer } from 'reactn'

setGlobal({warningModal:{opened:false, content:"", header:""}})

addReducer('openWarningModal',  (global, dispatch, modalInfo) => {
  return { warningModal: modalInfo }
})



