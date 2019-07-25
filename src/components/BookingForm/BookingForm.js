import React, { useGlobal, useState } from 'reactn'
import { isEmpty } from 'ramda'

import { rooms } from 'utils/bookSlotFormats'
import { nights } from 'utils/dateOperations'
import { DropDown } from 'components'

const BookingModal = () => {
  const [newBookingEvent, setNewBookingEvent] = useGlobal('newBookingEvent')
  const [currentBookingData] = useGlobal('currentBookingData')
  const [persons, setPersons] = useState(1)

  const roomInfo =
    !isEmpty(newBookingEvent) && rooms.filter(room => room.id === newBookingEvent.resourceId)[0]
  const nightsNum = nights(newBookingEvent.start, newBookingEvent.end)

  return (
    <div>
      <h2>bookingform</h2>
      [provést nový výběr]
      <br />
      <p>vybraný pokoj: {newBookingEvent.resourceId} </p>
      <p>
        vybraný termín: {newBookingEvent.start} [dpicon] {newBookingEvent.end}to [dpicon] (# nocí:{nightsNum}
        -nesedi)
      </p>
      <div>
        Počet lidí: -up to{' '}
        <DropDown onChange={e => setPersons(e.value)} numbers={roomInfo.maxPersons} value={persons} />
      </div>
      <p>vaše jméno: -input jmeno-</p>
      <p>vaše adresa: -input adresa-</p>
      <p>vaše telefon: -input telefon-</p>
      <p>vaše email: -input email-</p>
      <p>Přídavné služby</p>
      <p>parkování -check-</p>
      <hr />
      Cena:
      {currentBookingData.data &&
        currentBookingData.data.priceOne + persons * currentBookingData.data.priceOneMore}
    </div>
  )
}
export default BookingModal
