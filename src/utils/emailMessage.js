export const createEmailMessage = (reservationDetails) => {
  return `<center>
        <h1>Thanks for your Reservation.</h1>
        <p style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;font-size: 18px; font-weight: bold;">Here are the details of your stay:</p>
        <table style="border-collapse: collapse; font-weight: 550; background: rgb(238,238,228);color: black;">
          <tbody>
            <tr>
              <td style="border: 1px solid black; padding: 8px 38px">
                Guest Name
              </td>
              <td style="border: 1px solid black; padding: 8px 38px">
                ${reservationDetails.name}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px 38px">
                Hotel Name
              </td>
              <td style="border: 1px solid black; padding: 8px 38px">
                ${reservationDetails.hotelName}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px 38px">
                Email
              </td>
              <td style="border: 1px solid black; padding: 8px 38px">
                ${reservationDetails.email}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px 38px">
                Room Type
              </td>
              <td style="border: 1px solid black; padding: 8px 38px">
                ${reservationDetails.roomType}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px 38px">
                Room Count
              </td>
              <td style="border: 1px solid black; padding: 8px 38px">
                ${reservationDetails.roomCount}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px 38px">
                Check In
              </td>
              <td style="border: 1px solid black; padding: 8px 38px">
                ${reservationDetails.checkIn}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid black; padding: 8px 38px">
                Check Out
              </td>
              <td style="border: 1px solid black; padding: 8px 38px">
                ${reservationDetails.checkOut}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </center>`
}
