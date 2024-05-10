function formatTime(timeStamp) {
  let dateObj = new Date(timeStamp * 1000);
  // hours
  let hours = dateObj.getUTCHours();
  // minutes
  let minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
  let t = Math.floor(hours / 12) === 1 ? "pm" : "am"; //   am/pm)
  return String(hours % 12).padStart(2, "0") + "." + minutes + t;
}
function getDateTime(timeStamp) {
  let DateTime = new Date(timeStamp * 1000);
  let day = DateTime.toDateString().split(" "); //date in (dd, month)
  let time = DateTime.toLocaleTimeString().split(":"); //get hour and min  format
  let [h, m, t] = [
    time[0] > 12 ? time[0] - 12 : time[0],
    time[1],
    Math.floor(time[0] / 12) === 1 ? "pm" : "am",
  ]; //  time in  12h ( h,  min, am/pm)
  return h + "." + m + t + " ," + day[1] + " " + day[2];
}
export { getDateTime, formatTime };
