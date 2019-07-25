import React, { Component } from 'reactn'
//import {PropTypes} from 'prop-types'
import moment from 'moment'
import 'moment/locale/cs'
import '../components/react-big-scheduler/css/antd-globals-hiding-hack.css'
import '../components/react-big-scheduler/css/style.css'
import './myCss.css'
import Scheduler, { SchedulerData, ViewTypes /* DATE_FORMAT */ } from '../components/react-big-scheduler'
import DemoData from './DemoData'
import {
  DATE_DB_FORMAT,
  BOOK_TIME_START,
  BOOK_TIME_END,
  MIN_NIGHTS,
  EVENT_ITEM_HORIZONTAL_EDGE_PADDING,
  LAST_ROW_ADDED_HEIGHT,
} from '../config'
import withDragDropContext from './withDnDContext'
import { addVirtualBookingToCalendar, getNewLocalId } from '../utils/generateVirtualBookings'
import { newCreatedEvent, rooms } from '../utils/bookSlotFormats'
import { nights, setCheckInTime, setCheckOutTime, isInFuture } from '../utils/dateOperations'

class Calendar extends Component {
  constructor(props) {
    super(props)
    let schedulerData = new SchedulerData(new moment().format(DATE_DB_FORMAT), ViewTypes.Year, false, false, {
      checkConflict: true,
      nonAgendaDayCellHeaderFormat: 'D. M. HH:mm',
      nonAgendaOtherCellHeaderFormat: 'D. M',
      eventItemLineHeight: 35,
      BOOK_TIME_START,
      BOOK_TIME_END,
      EVENT_ITEM_HORIZONTAL_EDGE_PADDING,
      LAST_ROW_ADDED_HEIGHT,
    })
    schedulerData.localeMoment.locale('cs')
    schedulerData.setResources(rooms)
    schedulerData.setEvents([])
    this.state = {
      viewModel: schedulerData,
    }
  }

  componentDidMount() {
    this.reloadBookedItems()
  }

  render() {
    const { viewModel } = this.state
    return (
      <div>
        <div>
          <h3 style={{ textAlign: 'center' }}>Booking pokojů</h3>
          <Scheduler
            schedulerData={viewModel}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            eventItemClick={this.eventClicked}
            viewEventClick={this.ops1}
            viewEvent2Click={this.ops2}
            updateEventStart={this.updateEventStart}
            updateEventEnd={this.updateEventEnd}
            moveEvent={this.moveEvent}
            newEvent={this.newEvent}
            conflictOccurred={this.conflictOccurred}
          />
        </div>
      </div>
    )
  }
  calendarUpdate = schedulerData => {
    this.setState({
      viewModel: schedulerData,
    })
  }

  reloadBookedItems = () => {
    this.dispatch.getBookingData().then(data => {
      this.reloadBookedItemsApply()
    })
  }

  reloadBookedItemsApply = () => {
    let schedulerData = this.state.viewModel
    schedulerData.setEvents(this.global.eventsData)
    this.calendarUpdate(schedulerData)
  }

  newEvent = async (schedulerData, slotId, slotName, start, end, type, item) => {
    schedulerData.removeEvent(this.global.newBookingEvent)
    let bookStart = setCheckInTime(start)
    let bookEnd = setCheckOutTime(end)

    if (this.checkEventPosibility('WARNING', { start: bookStart, end: bookEnd, slotId })) {
      getNewLocalId(schedulerData)
      let newEvent = {
        ...newCreatedEvent,
        id: getNewLocalId(schedulerData),
        start: bookStart,
        end: bookEnd,
        resourceId: slotId,
      }
      schedulerData.addEvent(newEvent)
      console.log('ADDED item: ', newEvent)
      //addVirtualBookingToCalendar(schedulerData, newEvent)

      this.calendarUpdate(schedulerData)
      this.dispatch.setNewBookingEvent(newEvent)
      this.dispatch.checkRoomData(newEvent)
      /* 
      const checkResponse = await checkBooking(newEvent) // checkBooking or addBooking
      console.log('checkResponse', checkResponse)
      
      if (checkResponse.data.error === 'time-slot-taken') {
        setGlobal({ bookingModalOpened: false })
        setGlobal({ warningModal: { opened: true, content: 'aktualizovany překryv', header: 'nelze!' } })
        this.reloadBookedItems()
      } */
    }
  }

  checkEventPosibility = (alert, event) => {
    if (!isInFuture(event.start)) {
      alert === 'WARNING' &&
        this.dispatch.openWarningModal({
          opened: true,
          content: 'datum začíná v minulosti',
          header: 'Neplatné datum',
        })
      return false
    } else if (nights(event.start, event.end) < MIN_NIGHTS) {
      alert === 'WARNING' &&
        this.dispatch.openWarningModal({
          opened: true,
          content: `minimální počet nocí jsou${MIN_NIGHTS}`,
          header: 'Není možné',
        })
      return false
    }
    return true
  }

  conflictOccurred = (schedulerData, action, event, type, slotId, slotName, start, end) => {
    console.log(`Conflict occurred.`, schedulerData, action, event, type, slotId, slotName, start, end)
    //setGlobal({ warningModal: { opened: true, content: 'překryv', header: 'nelze!' } })
  }

  eventClicked = (schedulerData, event) => {
    /* alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}, start:${event.start}, end: ${
        event.end
      }}`,
    ) */
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective)
    schedulerData.setEvents(this.global.eventsData)
    this.calendarUpdate(schedulerData)
  }

  onSelectDate = (schedulerData, date) => {
    console.log('onSelectDate', date)
    schedulerData.setDate(date)
    schedulerData.setEvents(DemoData.events)
    this.calendarUpdate(schedulerData)
  }

  updateEventStart = (schedulerData, event, newStart) => {
    const newEvent = { ...event, start: newStart }
    if (this.checkEventPosibility('WARNING', newEvent)) {
      schedulerData.updateEventStart(event, newStart)
      this.dispatch.setNewBookingEvent(newEvent)
      this.calendarUpdate(schedulerData)
    }
  }

  updateEventEnd = (schedulerData, event, newEnd) => {
    const newEvent = { ...event, end: newEnd }
    if (this.checkEventPosibility('WARNING', newEvent)) {
      schedulerData.updateEventEnd(event, newEnd)
      this.dispatch.setNewBookingEvent(newEvent)
      this.calendarUpdate(schedulerData)
    }
  }

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    const newEvent = { ...event, end, start, slotId }
    if (this.checkEventPosibility('WARNING', newEvent)) {
      schedulerData.moveEvent(event, slotId, slotName, start, end)
      this.dispatch.setNewBookingEvent(newEvent)
      this.calendarUpdate(schedulerData)
    }
  }

  prevClick = schedulerData => {
    schedulerData.prev()
    schedulerData.setEvents(DemoData.events)
    this.calendarUpdate(schedulerData)
  }

  nextClick = schedulerData => {
    schedulerData.next()
    schedulerData.setEvents(DemoData.events)
    this.calendarUpdate(schedulerData)
  }
}

export default withDragDropContext(Calendar)
