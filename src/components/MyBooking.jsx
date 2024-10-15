import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import Header from './Header';
import noTaskImage from '../assets/NOTASK.png'; 
import Footer from './Footer';


const localizer = momentLocalizer(moment);

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/my-bookings');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data); 
          setBookings(data);
        } else {
          console.error('Error fetching bookings');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchBookings();
  }, []);

  const events = bookings.map((booking) => {
    const bookingDate = moment(booking.date).format('YYYY-MM-DD'); 
    const startDateTime = new Date(`${bookingDate}T${booking.time}`); 
    
    const endDateTime = new Date(startDateTime.getTime() + booking.duration * 60 * 60 * 1000);

    return {
      title: `Location: ${booking.location}, Price: ${booking.price} USD`,
      start: startDateTime,
      end: endDateTime,
      allDay: false,
    };
  });

  return (
    <>
    <Header/>
    <div className="my-bookings container">
      <h2 className='text-2xl text-blue-400 m-2 pb-4 -ml-5 font-bold pt-6'>My Bookings</h2>
      {bookings.length > 0 ? (
        <div style={{ height: '600px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, margin: '50px' }}
          />
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <img src={noTaskImage} alt='no booking' className='w-1/3' />
          <p className='text-center font-bold'>No bookings found.</p>
        </div>

      )}
    </div>
    <Footer/>
    </>
  );
}

export default MyBookings;
