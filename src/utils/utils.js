import moment from 'moment'
export const getFromParam = (days) => {
    const date = moment().subtract(days, 'days').startOf('day').format('YYYY-MM-DD')
    return date
}

export const getTodayWeekday = () => moment().isoWeekday()

// how many days needs to be fetched depending on the weekday
// (on monday, we load sunday, saturday, friday, so 1 -> 3)
export const daysAgoMap = {
    0: 2,// sunday (ISO) https://en.wikipedia.org/wiki/ISO_week_date,
    1: 3,  // monday
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 2, // saturday
}

export const getTodayFromParam = () => getFromParam(daysAgoMap[getTodayWeekday()] || 1)

export const humanizeFromParam = (fromParam) => moment(fromParam, 'YYYY-MM-DD').fromNow()