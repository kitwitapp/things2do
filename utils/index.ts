const SUBJECTS = [
  'English',
  'Mathematics',
  'Hindi',
  'Telugu',
  'Physics',
  'Biology',
]

export function getDateString(day: Date): string {
  return day.toISOString().split('T')[0]
}

export function getDummyData() {
  return {
    0: {
      image: 'https://placekitten.com/200/240',
      text: 'Chloe',
    },
    1: {
      image: 'https://placekitten.com/200/201',
      text: 'Jasper',
    },
    2: {
      image: 'https://placekitten.com/200/202',
      text: 'Pepper',
    },
    3: {
      image: 'https://placekitten.com/200/203',
      text: 'Oscar',
    },
    4: {
      image: 'https://placekitten.com/200/204',
      text: 'Dusty',
    },
  }
}

export function getRandomSubject() {
  /*
  Not to be used in production. Just to quick insert a random subject to
  generate calendar data.
  */
  const random = Math.floor(Math.random() * SUBJECTS.length)
  return SUBJECTS[random]
}

export function prepareMarkedDates(resultSet: Array<{ date: string }>) {
  // Prepare an array from the result objects of active dates
  let allDates: Array<string> = []
  resultSet.map((obj, _idx) => {
    allDates.push(obj.date)
  })

  // Store an array of distinct values in `dates`
  const dates = allDates.filter((item, i, arr) => arr.indexOf(item) === i)

  // Prepare an object to feed Calendar's markedDates prop
  const markedDates = {}
  dates.map((date, _idx) => {
    markedDates[date] = { marked: true }
  })

  return markedDates
}
