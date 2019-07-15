import axios from 'axios'
import { API_URL } from './config'
import { parseCalendarToBooking } from './utils/parseData'


  const api = axios.create({
    baseURL: API_URL,
    headers: {
      Accept: 'application/json, application/xml, text/play, text/html,',
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
/*   api.interceptors.response.use(
    response => response,
    (error: Object) => {
      if (error.response.data.code === 'MiddlewareError') {
        //middlewareErrorHandler(dispatch, error.response.data)
      }
      return //Promise.reject(error)
    }
  ) */
 

  export const fetchBookings = () => api.get('/bookings')
  export const addBooking = booking => api.post('/bookings', parseCalendarToBooking(booking))
  export const checkBooking = booking => api.post('/bookings/check', parseCalendarToBooking(booking))



/* const createApi = (url, getState, dispatch) => {
  const api = axios.create({
    withCredentials: 'empty',
    baseURL: url,
    headers: {
      Accept: 'application/json, application/xml, text/play, text/html, ',
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
  api.interceptors.response.use(
    response => response,
    (error: Object) => {
      if (error.response.data.code === 'MiddlewareError') {
        //middlewareErrorHandler(dispatch, error.response.data)
      }
      return //Promise.reject(error)
    }
  )
  return api
}

export default  (getState = '', dispatch = '') => {
  const api = createApi(API_URL, getState, dispatch)

  const fetchBookings = () => api.get('/bookings')
  const addBooking = booking => console.log("api res", booking)//api.post('/bookings', parseCalendarToBooking(booking))

  return {
    fetchBookings,
    addBooking,
  }
} */
