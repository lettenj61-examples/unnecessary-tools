import dayjs, { type Dayjs } from 'dayjs'
import { type FormEvent, useState } from 'react'

export default function DayjsComponent() {
  const [date, setDate] = useState<Dayjs>(dayjs())
  const [format, setFormat] = useState('')

  return (
    <>
      <p className="subtitle">Date and Time (powered by <a href="https://day.js.org">Day.js</a>)</p>
      <DateEditor date={date} setDate={setDate} />

      <hr />

      <div className="columns">
        <div className="column">
          <p className="subtitle">Format</p>
          <DateFormat date={date} format={format} setFormat={setFormat} />
        </div>

        <div className="column">
          <p className="subtitle">Modify</p>
          <DateModifier date={date} format={format} />
        </div>
      </div>
    </>
  )
}

function DateEditor({ date, setDate }: { date: Dayjs, setDate: (d: Dayjs) => void }) {
  const [dateString, setDateString] = useState('')
  const [parseError, setParseError] = useState('')

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    setDateString(e.currentTarget.value)
  }

  const acceptValidDate = (d: Dayjs, clearInput: boolean = false) => {
    setDate(d)
    setParseError('')

    if (clearInput) {
      setDateString('')
    }
  }

  const onNowButton = () => acceptValidDate(dayjs(), true)

  const onParse = () => {
    const res = dayjs(dateString)
    if (res.isValid()) {
      acceptValidDate(res)
    } else {
      setParseError(`Invalid date: ${dateString || '""'}`)
    }
  }

  return (
    <>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <input
            type="text"
            className="input is-medium"
            onInput={onInput}
            value={dateString}
            placeholder="Fill in any date"
          />
        </div>
        <div className="control">
          <button className="button is-medium is-primary" onClick={onParse}>Parse</button>
        </div>
        <div className="control">
          <button className="button is-medium is-info" onClick={onNowButton}>Now</button>
        </div>
      </div>

      {Boolean(parseError)
        ? <div className="notification is-size-5 is-danger">{parseError}</div>
        : <div className="notification is-size-5">
            <span><strong>Base{': '}</strong></span>
            {date.format()}
          </div>
      }
    </>
  )
}

function DateFormat({ date, format, setFormat }: {
  date: Dayjs,
  format: string,
  setFormat: (s: string) => void
}) {

  const updateFormat = (e: FormEvent<HTMLInputElement>) => {
    setFormat(e.currentTarget.value)
  }

  return (
    <>
      <div className="field is-grouped">
        <div className="control">
          <input type="text" className="input is-medium" value={format} onInput={updateFormat} />
        </div>
        <div className="control">
          <button className="button is-medium" onClick={() => setFormat('')}>Reset</button>
        </div>
      </div>
      <div className="notification is-link is-light is-size-5">
        <span><strong>Result{': '}</strong></span>
        {format === '' ? date.format() : date.format(format)}
      </div>
    </>
  )
}

type Operator = 'add' | 'subtract'

function isOperator(op: unknown): op is Operator {
  return op === 'add' || op === 'subtract'
}

function displayOperator(op: Operator): string {
  if (op === 'add') {
    return 'Add'
  } else if (op === 'subtract') {
    return 'Subtract'
  } else {
    return ''
  }
}

function parseDuration(duration: string): [number, string] {
  const [amount, unit] = duration.split(' ')

  return [parseInt(amount, 10), unit ?? '']
}

function DateModifier({ date, format }: { date: Dayjs, format: string }) {
  const [duration, setDuration] = useState('')
  const [operator, setOperator] = useState('add')

  const operators: Operator[] = ['add', 'subtract']

  const onInput = (e: FormEvent<HTMLInputElement>) => (
    setDuration(e.currentTarget.value)
  )

  const changeOperator = (e: FormEvent<HTMLSelectElement>) => (
    setOperator(e.currentTarget.value)
  )

  const newDate = (() => {
    const [amount, unit] = parseDuration(duration)
    if (Number.isNaN(amount) || unit === '') {
      return dayjs(null)
    }

    if (!isOperator(operator)) {
      return dayjs(null)
    }

    return operator === 'add'
      ? date.add(amount, unit)
      : operator === 'subtract'
        ? date.subtract(amount, unit)
        : dayjs(null)
  })()

  return (
    <>
      <div className="field has-addons">
        <div className="control">
          <span className="select is-medium">
            <select onChange={changeOperator}>
              {operators.map(op => (
                <option value={op} key={`operator--${op}`}>{displayOperator(op)}</option>
              ))}
            </select>
          </span>
        </div>
        <div className="control">
          <input type="text" className="input is-medium" onInput={onInput} placeholder='e.g. "2 days"' />
        </div>
      </div>
      <div className="notification is-success is-light is-size-5">
        <span><strong>Modified{': '}</strong></span>
        {newDate.isValid() ? newDate.format(format) : 'Unable to modify!'}
      </div>
    </>
  )
}