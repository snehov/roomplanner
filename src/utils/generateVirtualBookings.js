import moment from 'moment'

import { newCreatedNotAvailable } from './bookSlotFormats'

//const calculateVirtualBookings = () => {}
//const addBooking = () => {}
//const addCommonBooking = () => {}

export const getNewLocalId = schedulerData => {
  let newFreshId = 0
  schedulerData.events.forEach(item => {
    if (item.id >= newFreshId) newFreshId = item.id + 1
  })
  return newFreshId
}

const setCompoundRoomUnavailable = (schedulerData, newEvent) => {
  let bookStart = newEvent.start
  let bookEnd = newEvent.end

  let newCombineRoomEvent = {
    ...newCreatedNotAvailable,
    id: newEvent.id + 1,
    start: bookStart,
    end: bookEnd,
    resourceId: 'r3',
  }
  /// tohle zdisabluje moznost obou pokoju..
  console.log('ADDED item: ', newCombineRoomEvent)
  let modified = false
  schedulerData.events.forEach(item => {
    if (item.resourceId === 'r3') {
      if (moment(bookStart).isAfter(item.start) && moment(bookEnd).isBefore(item.end)) {
        // console.log('included, skip!!')
        modified = true
      } else {
        if (moment(bookStart).isAfter(item.start) && moment(bookStart).isBefore(item.end)) {
          // console.log('overlap zprava!!')
          schedulerData.updateEventEnd(item, bookEnd)
          modified = true
        }
        if (moment(bookEnd).isAfter(item.start) && moment(bookEnd).isBefore(item.end)) {
          // console.log('overlap zleva!!')
          schedulerData.updateEventStart(item, bookStart)
          modified = true
        }
        if (moment(bookStart).isSame(item.end, 'day')) {
          // console.log('napojeni zprava!!')
          schedulerData.updateEventEnd(item, bookEnd)
          modified = true
        }
        if (moment(bookEnd).isSame(item.start, 'day')) {
          // console.log('napojeni zleva!!')
          schedulerData.updateEventStart(item, bookStart)
          modified = true
        }
      }
    }
  })
  !modified && schedulerData.addEvent(newCombineRoomEvent)
}
const setCommonRoomsUnavailable = (schedulerData, newEvent) => {
  let bookStart = newEvent.start
  let bookEnd = newEvent.end
  let newFreshId = getNewLocalId(schedulerData)

  // TODO: for cyklus na vztah mezi mistnostma
  let r1OutDueToBoth = {
    ...newCreatedNotAvailable,
    id: newFreshId + 1,
    start: bookStart,
    end: bookEnd,
    resourceId: 'r1',
  }
  schedulerData.addEvent(r1OutDueToBoth)

  let r2OutDueToBoth = {
    ...r1OutDueToBoth,
    id: newFreshId + 2,
    resourceId: 'r2',
  }
  schedulerData.addEvent(r2OutDueToBoth)
}
export const addVirtualBookingToCalendar = (schedulerData, newEvent) => {
  let slotId = newEvent.resourceId
  // TODO: definovat id pokoju pres promenne
  if (['r1', 'r2'].includes(slotId)) {
    setCompoundRoomUnavailable(schedulerData, newEvent)
  }
  if (['r3'].includes(slotId)) {
    setCommonRoomsUnavailable(schedulerData, newEvent)
  }
}
