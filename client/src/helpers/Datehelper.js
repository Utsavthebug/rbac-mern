export const  convertUTCDateToLocalDate = (dateStr) => {
 // UTC datetime
var utcDate = new Date(dateStr);

// Convert UTC datetime to local datetime
var localDate = new Date(utcDate.toLocaleString());

// Convert UTC datetime to local datetime
var localDate = new Date(utcDate.toLocaleString());

// Get day, month, year, and time
var day = localDate.getDate();
var month = localDate.getMonth() + 1; // January is 0
var year = localDate.getFullYear();
var hours = localDate.getHours();
var minutes = localDate.getMinutes();
var seconds = localDate.getSeconds();

// Determine AM or PM
var amOrPm = hours >= 12 ? 'PM' : 'AM';

// Adjust hours for 12-hour format
hours = hours % 12;
hours = hours ? hours : 12; // 0 should be converted to 12

// Format the output
var formattedDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + amOrPm;

return formattedDate
}