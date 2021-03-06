export const rooms = [
  {
    id: 'r1',
    name: 'První',
    maxPersons: 3,
  },
  {
    id: 'r2',
    name: 'Druhý',
    maxPersons: 2,
  },
  {
    id: 'r3',
    name: 'Oba',
    maxPersons: 5,
  },
]

export const newCreatedNotAvailable = {
  id: null,
  start: null,
  end: null,
  resourceId: null,
  title: 'not available',
  bgColor: 'gray',
  showPopover: false,
  movable: false,
  resizable: false,
}
export const newCreatedEvent = {
  id: null,
  start: null,
  end: null,
  resourceId: null,
  title: 'Your booking',
  bgColor: 'purple',
  showPopover: false,
  movable: true,
  resizable: true,
}
export const alreadyBooked = {
  id: null,
  start: null,
  end: null,
  resourceId: null,
  bgColor: '#FA9E95',
  showPopover: false,
  movable: false,
  resizable: false,
  title: 'iam booked',
}
export const alreadyNotAvailable = {
  id: null,
  start: null,
  end: null,
  resourceId: null,
  bgColor: '#D9D9D9',
  showPopover: false,
  movable: false,
  resizable: false,
  title: 'not available',
}
