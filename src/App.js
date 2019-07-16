import React, { Component } from 'react'
import { useGlobal,setGlobal, addReducer } from 'reactn'
//b import CalendarInfinite from "./Calendar/CalendarInfinite";
//import Calendar_from_node from "./Calendar/Calendar_from_node_modules";
import Calendar from './Calendar/Calendar'
import BookingModal from './components/bookingModal/BookingModal'
import WarningModal from "./components/warningModal/WarningModal"
//import './App.css';
setGlobal({bookingModalOpened:false})
setGlobal({warningModal:{opened:false, content:"", header:""}})

const App = () => {
  const [bookingModalOpened, setBookingModalOpen] = useGlobal('bookingModalOpened')
  const [warningModal, setWarningModalProps] = useGlobal('warningModal')
  console.log('bookingModalOpened', bookingModalOpened)
  return (
    <div className="App">
      {bookingModalOpened && <BookingModal onClose={() => setBookingModalOpen(false)} />}
      {warningModal.opened && <WarningModal onClose={() => setWarningModalProps({opened:false})} />}
      <header className="App-header">
        {/* <CalendarInfinite />  */}
        <hr />
        {/* <Calendar_from_node/>     */}
        <Calendar />
      </header>
    </div>
  )
}

export default App
