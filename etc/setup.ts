import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import duration from 'dayjs/plugin/duration'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import relativeTime from 'dayjs/plugin/relativeTime'

const plugins = [
  advancedFormat,
  dayOfYear,
  duration,
  quarterOfYear,
  relativeTime,
]

for (const p of plugins) {
  dayjs.extend(p)
}
