import moment from 'moment'
import { DATE_DB_FORMAT, BOOK_TIME_START, BOOK_TIME_END } from '../config'

export const nights = (startDate, endDate) => {
  let start = moment(startDate)
  let end = moment(endDate)
  return end.diff(start, 'days')+1 // TODO: something is wrong here, it can differ one day (00-23, vs 10 to 14)
}

export const setCheckInTime = start => {
  return moment(start)
    .add(BOOK_TIME_START, 'hours')
    .format(DATE_DB_FORMAT)
}
export const setCheckOutTime = end => {
  return moment(end)
    .add(-(24 - BOOK_TIME_END), 'hours')
    .add(1, 'second')
    .format(DATE_DB_FORMAT)
}
export const isInFuture = date => {
  return moment(date).diff(new Date(), 'days') < 0 ? false : true
}
