import { useGlobal, setGlobal, addReducer } from 'reactn'
import { addBooking, checkBooking, fetchBookings } from '../api'
import { parseBookingToCalendar } from '../utils/parseData'

setGlobal({ eventsData: [] });
setGlobal({ newBookingEvent: {} });
setGlobal({ currentBookingData:{}})

addReducer('getBookingData', async (global, dispatch, i, j) => {
  let response = await fetchBookings()
  return { eventsData: parseBookingToCalendar(response.data) }
})
addReducer('checkRoomData', async (global, dispatch, newEvent) => {
  console.log("check dispatch",newEvent)
  let response = await checkBooking(newEvent)
  return { currentBookingData: (response.data) }
})
addReducer('setNewBookingEvent',  (global, dispatch, newEvent) => {
  return { newBookingEvent: newEvent }
})



