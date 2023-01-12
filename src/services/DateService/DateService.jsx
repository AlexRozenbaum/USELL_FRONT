export default function DateService(_date) {
  let d = new Date(_date);
  let date = d.getDate();
  let month = d.getMonth() + 1;
  if (date < 10) {
    date = "0" + date;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let year = d.getFullYear();
  let newDate = year + "-" + month + "-" + date;
  return newDate;
}
