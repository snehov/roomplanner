import moment from 'moment'
import { DATE_DB_FORMAT } from '../config'
import { alreadyBooked, alreadyNotAvailable } from './bookSlotFormats'

export const parseBookingToCalendar = bookingData => {
  return bookingData.map(record => {
    let commonEventProps = record.virtual_book ? alreadyNotAvailable : alreadyBooked
    return {
      ...commonEventProps,
      id: record.id_booking,
      start: moment(record.book_start).format(DATE_DB_FORMAT),
      end: moment(record.book_end).format(DATE_DB_FORMAT),
      resourceId: `r${record.id_room}`,
    }
  })
}

export const parseCalendarToBooking = calendarData => {
  return {
    id_order: 1,
    book_start: moment(calendarData.start).format(DATE_DB_FORMAT),
    book_end: moment(calendarData.end).format(DATE_DB_FORMAT),
    id_room: calendarData.resourceId.substring(1, toString(calendarData.id_room).length),
  }
}

