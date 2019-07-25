import { useGlobal, setGlobal, addReducer } from 'reactn'
import { addBooking, checkBooking, fetchBookings } from '../api'
import { parseBookingToCalendar } from '../utils/parseData'

setGlobal({ eventsData: [] });
addReducer('getBookingData', async (global, dispatch, i, j) => {
  let response = await fetchBookings()
  return { eventsData: parseBookingToCalendar(response.data) }
})



