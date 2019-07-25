import React, { Component } from 'reactn'
import { useGlobal, setGlobal, addReducer, useDispatch, getDispatch, addCallback } from 'reactn'
//import {PropTypes} from 'prop-types'
import moment from 'moment'
import 'moment/locale/cs'
import '../components/react-big-scheduler/css/antd-globals-hiding-hack.css'
import '../components/react-big-scheduler/css/style.css'
import './myCss.css'
import Scheduler, { SchedulerData, ViewTypes /* DATE_FORMAT */ } from '../components/react-big-scheduler'
import DemoData from './DemoData'
import { parseBookingToCalendar } from '../utils/parseData'
//import Nav from './Nav'
import {
  DATE_DB_FORMAT,
  BOOK_TIME_START,
  BOOK_TIME_END,
  MIN_NIGHTS,
  EVENT_ITEM_HORIZONTAL_EDGE_PADDING,
  LAST_ROW_ADDED_HEIGHT,
} from '../config'
import withDragDropContext from './withDnDContext'
import { addBooking, checkBooking, fetchBookings } from '../api'
import { addVirtualBookingToCalendar, getNewLocalId } from '../utils/generateVirtualBookings'
import { newCreatedEvent, rooms } from '../utils/bookSlotFormats'
import { nights, setCheckInTime, setCheckOutTime, isInFuture } from '../utils/dateOperations'
import '../reducers/bookDataReducer'

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
        {/* <Nav /> */}
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
            viewEventText="Ops 1"
            viewEvent2Text="Ops 2"
            viewEvent2Click={this.ops2}
            updateEventStart={this.updateEventStart}
            updateEventEnd={this.updateEventEnd}
            moveEvent={this.moveEvent}
            newEvent={this.newEvent}
            onScrollLeft={this.onScrollLeft}
            onScrollRight={this.onScrollRight}
            onScrollTop={this.onScrollTop}
            onScrollBottom={this.onScrollBottom}
            conflictOccurred={this.conflictOccurred}
          />
        </div>
      </div>
    )
  }
  reloadBookedItems = () => {
    this.dispatch.getBookingData().then(data => {
      console.log('dispatch data', data.eventsData)
      this.reloadBookedItemsApply()
    })
  }
  reloadBookedItemsApply = () => {
    let schedulerData = this.state.viewModel
    schedulerData.setEvents(this.global.eventsData)
    this.setState({
      viewModel: schedulerData,
    })
  }

  newEvent = async (schedulerData, slotId, slotName, start, end, type, item) => {
    let bookStart = setCheckInTime(start)
    let bookEnd = setCheckOutTime(end)

    if (!isInFuture(bookStart)) {
      setGlobal({
        warningModal: { opened: true, content: 'datum začíná v minulosti', header: 'Neplatné datum' },
      })
    } else if (nights(start, end) < MIN_NIGHTS) {
      setGlobal({
        warningModal: {
          opened: true,
          content: `minimální počet nocí jsou${MIN_NIGHTS}`,
          header: 'Není možné',
        },
      })
    } else {
      //window.confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)
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

      addVirtualBookingToCalendar(schedulerData, newEvent)
      setGlobal({ newBookingEvent: newEvent })
      //setGlobal({ bookingModalOpened: true })
      const checkResponse = await checkBooking(newEvent) // checkBooking or addBooking
      console.log('checkResponse', checkResponse)
      if (checkResponse.data.error === 'time-slot-taken') {
        setGlobal({ bookingModalOpened: false })
        setGlobal({ warningModal: { opened: true, content: 'aktualizovany překryv', header: 'nelze!' } })
        this.reloadBookedItems()
      }
    }
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

  prevClick = schedulerData => {
    schedulerData.prev()
    schedulerData.setEvents(DemoData.events)
    this.setState({
      viewModel: schedulerData,
    })
  }

  nextClick = schedulerData => {
    schedulerData.next()
    schedulerData.setEvents(DemoData.events)
    this.setState({
      viewModel: schedulerData,
    })
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective)
    schedulerData.setEvents(this.global.eventsData)
    this.setState({
      viewModel: schedulerData,
    })
  }

  onSelectDate = (schedulerData, date) => {
    console.log('onSelectDate', date)
    schedulerData.setDate(date)
    schedulerData.setEvents(DemoData.events)
    this.setState({
      viewModel: schedulerData,
    })
  }

  ops1 = (schedulerData, event) => {
    alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`)
  }

  ops2 = (schedulerData, event) => {
    alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`)
  }

  updateEventStart = (schedulerData, event, newStart) => {
    // if(confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
    schedulerData.updateEventStart(event, newStart)
    // }
    this.setState({
      viewModel: schedulerData,
    })
  }

  updateEventEnd = (schedulerData, event, newEnd) => {
    //if(confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
    schedulerData.updateEventEnd(event, newEnd)
    // }
    this.setState({
      viewModel: schedulerData,
    })
  }

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    // if(confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
    schedulerData.moveEvent(event, slotId, slotName, start, end)
    this.setState({
      viewModel: schedulerData,
    })
    //}
  }

  onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next()
      schedulerData.setEvents(DemoData.events)
      this.setState({
        viewModel: schedulerData,
      })

      schedulerContent.scrollLeft = maxScrollLeft - 10
    }
  }

  onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev()
      schedulerData.setEvents(DemoData.events)
      this.setState({
        viewModel: schedulerData,
      })

      schedulerContent.scrollLeft = 10
    }
  }
}

export default withDragDropContext(Calendar)
