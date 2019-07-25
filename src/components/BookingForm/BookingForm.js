import React, {useGlobal} from 'reactn'

const BookingModal = () => {
  const [newBookingEvent, setNewBookingEvent] = useGlobal('newBookingEvent')
  return (
    <div>
      <h2>bookingform</h2>
      [provést nový výběr]
      <br />
      <p>vybraný pokoj: {newBookingEvent.resourceId} </p>
      <p>vybraný termín: {newBookingEvent.start} [dpicon] {newBookingEvent.end}to [dpicon] (# nocí)</p>
      <p>Počet lidí: -dropdown [1,2,3]-</p>
      <p>vaše jméno: -input jmeno-</p>
      <p>vaše adresa: -input adresa-</p>
      <p>vaše telefon: -input telefon-</p>
      <p>vaše email: -input email-</p>
      <p>Přídavné služby</p>
      <p>parkování -check-</p>
    </div>
  )
}
export default BookingModal
