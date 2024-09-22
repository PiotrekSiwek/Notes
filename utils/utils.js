const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

export function getDate() {
const today = new Date();
const day = today.getDate();
const month = months[today.getMonth()]
return `${month} ${day}`;
}