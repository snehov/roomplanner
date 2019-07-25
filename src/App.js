import React, { Component } from 'react'
import { useGlobal,setGlobal, addReducer, addCallback } from 'reactn'
//b import CalendarInfinite from "./Calendar/CalendarInfinite";
//import Calendar_from_node from "./Calendar/Calendar_from_node_modules";
import Calendar from './Calendar/Calendar'
import {BookingModal, WarningModal, BookingForm} from './components/'
import "./reducers"
//import './App.css';
setGlobal({bookingModalOpened:false})
//setGlobal({warningModal:{opened:false, content:"", header:""}})


const App = () => {
  //const [bookingModalOpened, setBookingModalOpen] = useGlobal('bookingModalOpened')
  const [warningModal, setWarningModalProps] = useGlobal('warningModal')

  return (
    <div className="App">
      {/* bookingModalOpened && <BookingModal onClose={() => setBookingModalOpen(false)} /> */}
      {warningModal.opened && <WarningModal onClose={() => setWarningModalProps({opened:false})} />}
        {/* <CalendarInfinite />  */}
        {/* <Calendar_from_node/>     */}
        <Calendar />
         <BookingForm /> 
    </div>
  )
}

export default App
