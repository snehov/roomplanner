import React, { Component } from 'react'
//import {PropTypes} from 'prop-types'
import moment from 'moment'
import 'moment/locale/cs'
import 'react-big-scheduler/lib/css/style.css'
import './myCss.css'
import Scheduler, { SchedulerData, ViewTypes /* DATE_FORMAT */ } from 'react-big-scheduler'
import DemoData from './DemoData'
//import Nav from './Nav'
import Tips from './Tips'
import {
  DATE_DB_FORMAT,
  BOOK_TIME_START,
  BOOK_TIME_END,
  MIN_NIGHTS,
  EVENT_ITEM_HORIZONTAL_EDGE_PADDING,
} from '../config'
import withDragDropContext from './withDnDContext'

export const MIN_DAYS_TO_RESERVE = 3
export const nights = (startDate, endDate) => {
  let start = moment(startDate)
  let end = moment(endDate)
  //console.log("NIGHTS", nights)
  return end.diff(start, 'days')
}

class Calendar extends Component {
  constructor(props) {
    super(props)

    //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
    let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Month, false, false, {
      checkConflict: true,
      nonAgendaDayCellHeaderFormat: 'D. M. HH:mm',
      nonAgendaOtherCellHeaderFormat: 'D. M',
      minuteStep: 30,
      BOOK_TIME_START,
      BOOK_TIME_END,
      EVENT_ITEM_HORIZONTAL_EDGE_PADDING, //eventItemHozitontalEdgePadding:
    })
    schedulerData.localeMoment.locale('cs')
    schedulerData.setResources(DemoData.resources)
    schedulerData.setEvents(DemoData.events)
    this.state = {
      viewModel: schedulerData,
    }
  }

  render() {
    const { viewModel } = this.state
    return (
      <div>
        {/* <Nav /> */}
        <div>
          <h3 style={{ textAlign: 'center' }}>Basic example</h3>
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
            addEvent={this.addEvent}
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
    schedulerData.setEvents(DemoData.events)
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

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`)
  }

  ops1 = (schedulerData, event) => {
    alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`)
  }

  ops2 = (schedulerData, event) => {
    alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`)
  }

  addEvent = (...e) => {
    console.log('add event', e)
  }
  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    let bookStart = moment(start)
      .add(BOOK_TIME_START, 'hours')
      .format(DATE_DB_FORMAT)

    let bookEnd = moment(end)
      .add(-(24 - BOOK_TIME_END), 'hours')
      .add(1, 'second')
      .format(DATE_DB_FORMAT)

    console.log('start', start, bookStart)
    console.log('end', end, bookEnd)
    /*  let bookStart=start;
    let bookEnd=end; */
    if (nights(start, end) < MIN_NIGHTS) {
      alert('minimální počet nocí jsou 3')
    }
    //if(window.confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){
    else {
      let newFreshId = 0
      schedulerData.events.forEach(item => {
        if (item.id >= newFreshId) newFreshId = item.id + 1
      })

      let newEvent = {
        id: newFreshId,
        title: 'New event you just created',
        start: bookStart,
        end: bookEnd,
        resourceId: slotId,
        bgColor: 'purple',
        showPopover: false,
        movable: false,
        resizable: false,
      }
      console.log('ADDED item: ', newEvent)
      schedulerData.addEvent(newEvent)

      if (['r1', 'r2'].includes(slotId)) {
        let newCombineRoomEvent = {
          id: newFreshId + 1,
          title: 'not available',
          start: bookStart,
          end: bookEnd,
          resourceId: 'r3',
          bgColor: 'gray',
          showPopover: false,
          movable: false,
          resizable: false,
        }
        /// tohle zdisabluje moznost obou pokoju..
        console.log('ADDED item: ', newCombineRoomEvent)
        schedulerData.addEvent(newCombineRoomEvent)
      }
      if (['r3'].includes(slotId)) {
        let r1OutDueToBoth = {
          id: newFreshId + 1,
          title: 'not available',
          start: bookStart,
          end: bookEnd,
          resourceId: 'r1',
          bgColor: 'gray',
          showPopover: false,
          movable: false,
          resizable: false,
        }
        /// tohle zdisabluje moznost obou pokoju..
        console.log('ADDED item: ', r1OutDueToBoth)
        schedulerData.addEvent(r1OutDueToBoth)

        let r2OutDueToBoth = {
            id: newFreshId + 2,
            title: 'not available',
            start: bookStart,
            end: bookEnd,
            resourceId: 'r2',
            bgColor: 'gray',
            showPopover: false,
            movable: false,
            resizable: false,
          }
          /// tohle zdisabluje moznost obou pokoju..
          console.log('ADDED item: ', r2OutDueToBoth)
          schedulerData.addEvent(r2OutDueToBoth)
      }

      this.setState({
        viewModel: schedulerData,
      })
    }
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

  onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollTop')
  }

  onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('onScrollBottom')
  }
  conflictOccurred = (schedulerData, action, event, type, slotId, slotName, start, end) => {
    console.log(`Conflict occurred.`, schedulerData, action, event, type, slotId, slotName, start, end)
  }
}

export default withDragDropContext(Calendar)
