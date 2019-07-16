import styled from 'styled-components'

export const BottomOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  background-color: rgba(100, 100, 100, 0.5);
  z-index: 1000;
  justify-content: center;
`
export const ModalFrame = styled.div`
  z-index: 1001;
  width: 90%;
  max-width: ${props => (["warning"].includes(props.type)  ? '400px' : ' 700px;')};
  min-height: ${props => (["warning"].includes(props.type)  ? '160px' : ' 400px;')};
  border: 2px solid #f6f8f8;
  border-radius: 3px;
  background-color: white;
  align-self: center;
  display: flex;
  flex-flow: column;

`
export const ModalHeadline = styled.div`
  height: 30px;
  border-bottom: 2px solid #f6f8f8;
  display: flex;
  justify-content: space-between;
  background-color: #f6f8f8;
`
export const LeftTop = styled.div``

export const HeaderText = styled.div`
  font-weight: bold;
  align-self: center;
`
export const Close = styled.div`
  align-self: center;
  margin-right: 10px;
`
export const Content = styled.div`
  padding: ${props => (props.defaultPadding === true ? '15px' : '0px')};
  flex-grow: 2;
`
export const ModalFootline = styled.div`
  height: 30px;
  padding:5px;
  display: flex;
    justify-content: center;
`
export const ConfirmButton = styled.button`
  padding:1px 30px;
`
