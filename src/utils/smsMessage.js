export const createSMSMessage = (reservationDetails) => {
  return `
  Thanks for your Reservation.
  Here are the details of your stay:
  
  Guest Name : ${reservationDetails.name}
  Hotel Name : ${reservationDetails.hotelName}
  Email : ${reservationDetails.email}
  Room Type : ${reservationDetails.roomType}
  Room Count : ${reservationDetails.roomCount}
  Check In : ${reservationDetails.checkIn}
  Check Out : ${reservationDetails.checkOut} 
  `
}
