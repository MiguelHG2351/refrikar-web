export const DateInputFormat = (date: Date | string | null | undefined) => {
  if (!date) return ''
  let currentDate = new Date(date)
  // validate if the currentDate is a valid date
  if (isNaN(currentDate.getTime())) {
    return ''
  }

  const formatDate = new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    // add UTC to avoid timezone issues
    timeZone: 'UTC',
  })

  const formattedDate = formatDate.format(currentDate)
  return formattedDate.replaceAll('/', '-').split('-').join('-')
}