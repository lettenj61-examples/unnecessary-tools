import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import duration from 'dayjs/plugin/duration'
import isoWeek from 'dayjs/plugin/isoWeek'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

const plugins = [
  advancedFormat,
  dayOfYear,
  duration,
  isoWeek,
  quarterOfYear,
  relativeTime,
  timezone,
  weekOfYear,
  weekYear,
]

for (const p of plugins) {
  dayjs.extend(p)
}
