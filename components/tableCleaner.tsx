import { useState } from 'react'

function useTableOptions() {
  const [column, setColumn] = useState(0)
  const [offset, setOffset] = useState(0)

  return {
    column,
    offset,
    setColumn,
    setOffset,
  }
}

export default function TableCleaner() {
  const [content, setContent] = useState('')
  const [tableData, setTableData] = useState<string[][]>([])
  const { column, offset, setColumn, setOffset } = useTableOptions()

  const onClick = () => {
    if (content.trim() === '') {
      return
    }

    const data = table2Array(content, column, offset)
    setTableData(data)
  }

  // const formattedString = tableData.length ? JSON.stringify(tableData, null, 2) : ''
  const formattedString = tableData.length ? tableData.map(row => row.join('\t')).join('\n') : ''

  return (
    <>
      <p className="subtitle">Clean table-like text</p>
      <div className="field">
        <label className="label">Column and offset</label>
      </div>
      <div className="field is-grouped">
        <p className="control">
          <input
            type="number"
            className="input"
            placeholder="Column"
            defaultValue={column}
            onInput={e => setColumn(e.currentTarget.valueAsNumber)}
          />
        </p>
        <p className="control">
          <input
            type="number"
            className="input"
            placeholder="Offset"
            defaultValue={offset}
            onInput={e => setOffset(e.currentTarget.valueAsNumber)}
          />
        </p>
      </div>
      <div className="buttons">
        <button className="button is-primary" onClick={onClick}>
          Clean Up
        </button>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <textarea className="textarea" onInput={e => setContent(e.currentTarget.value)}>
              {content}
            </textarea>
          </div>
        </div>

        <div className="column">
          <div className="field">
            <textarea
              className="textarea is-family-code"
              readOnly={true}
              value={formattedString}
            ></textarea>
          </div>
        </div>
      </div>
    </>
  )
}

interface TableCleanerOptions {
  column: number
  offset?: number
  filter?: (str: string) => boolean
}

/**
 * Parse multi lined string that typically copied from table element in
 * a PDF document, format them into two dimensional array.
 *
 * @param {string} raw input string
 * @param {number} cols number of elements ("cells") in each row
 * @param {number} offset number of elements to ignore while parsing e.g. headers.
 * @param {Function} filter
 * @returns {string[][]} parsed array of elements
 */
function table2Array(
  raw: string,
  cols: number,
  offset: number,
  filter?: (element: string) => boolean
): string[][] {
  let elems = raw.split('\n').slice(offset)
  if (filter !== undefined) {
    elems = elems.filter(filter)
  }
  const len = elems.length
  const rows = (len / cols) | 0

  return elems.reduce<string[][]>((output, value, ix) => {
    const to = (ix / cols) | 0
    if (output[to] == null) {
      output[to] = []
    }
    output[to].push(value)
    return output
  }, new Array(rows))
}
