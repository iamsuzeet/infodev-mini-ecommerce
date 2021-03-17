export default function formatDate(date?: string | Date) {
  if (date) {
    const dateVal: Date = date ? new Date(date) : new Date();
    let day = dateVal.getDate();
    let month = dateVal.getMonth() + 1;
    let year = dateVal.getFullYear();

    const formattedDate = year + '-' + (month < 10 ? "0" + month : month) + '-' + (day < 10 ? "0" + day : day);

    return formattedDate;
  }

  return "";
}