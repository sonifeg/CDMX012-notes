// obtener fecha y pasarla a string
export function getDate(date) {
  return new Date(
    date.seconds * 1000 + date.nanoseconds / 1000000
  ).toDateString();
}
