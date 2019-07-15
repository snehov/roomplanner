import moment from 'moment'
import { DATE_DB_FORMAT } from '../config'

export const parseBookingToCalendar = bookingData => {
  return bookingData.map(record => {
    return {
      id: record.id_booking,
      start: moment(record.book_start).format(DATE_DB_FORMAT),
      end: moment(record.book_end).format(DATE_DB_FORMAT),
      resourceId: `r${record.id_room}`,
      bgColor: record.virtual_book ? '#D9D9D9' : '#FA9E95',
      showPopover: false,
      movable: false,
      resizable: false,
      title: record.virtual_book ? 'not available' : 'iam booked',
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
