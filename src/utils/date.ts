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

const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
}

const getSecondsDiff = (timestamp: number) => (Date.now() - timestamp) / 1000

const getUnitAndValueDate = (secondsElapsed: number) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

const getTimeAgo = (timestamp: number, locale: string) => {
  const rtf = new Intl.RelativeTimeFormat(locale)
  const secondsElapsed = getSecondsDiff(timestamp);
  const { value, unit } = getUnitAndValueDate(secondsElapsed)

  return rtf.format(value, unit as Intl.RelativeTimeFormatUnit)
  
}

export const timeAgo = (date: Date | string | null | undefined) => {
  const locale = 'es'
  const timeago = getTimeAgo

}