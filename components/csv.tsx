import Papa from 'papaparse'
import { Grid } from 'gridjs-react'
import { useState, type FormEvent } from 'react'
import 'gridjs/dist/theme/mermaid.css'

export default function Csv() {
  const [csvString, setCsvString] = useState('')
  const [parseResult, setParseResult] = useState<Papa.ParseResult<unknown> | null>(null)
  const [outputMode, setOutputMode] = useState<OutputMode>('json')
  const [withHeaders, setWithHeaders] = useState(false)

  function onTextInput(e: FormEvent<HTMLTextAreaElement>) {
    setCsvString(e.currentTarget.value)
  }
  function onClickParse() {
    if (csvString && csvString !== '') {
      const result = Papa.parse(csvString, { dynamicTyping: true, header: withHeaders })
      setParseResult(result)
    }
  }

  return (
    <>
      <p className="subtitle">CSV Parser</p>

      <div className="box has-background-light">
        <ParserSettings withHeaders={withHeaders} setWithHeaders={setWithHeaders} />
        <OutputModeControl mode={outputMode} setMode={setOutputMode} />
        <div className="buttons">
          <button onClick={onClickParse} className="button is-success">
            Parse
          </button>
        </div>
      </div>

      <div className="columns">
        <div className="column is-half-tablet">
          <div className="field">
            <textarea onInput={onTextInput} className="textarea" />
          </div>
        </div>

        <div className="column is-half-tablet">
          <Output result={parseResult!} mode={outputMode} />
        </div>
      </div>
    </>
  )
}

type OutputMode = 'gridjs' | 'json'

type CsvOutputProps = {
  result: Papa.ParseResult<unknown>
  mode: OutputMode
}

function Output({ result, mode }: CsvOutputProps) {
  if (!result || result.errors.length) {
    return (
      <div className="notification is-warning">
        <p>Parsing failure or no inputs.</p>
      </div>
    )
  }

  if (mode === 'json') {
    return (
      <div className="field">
        <textarea className="textarea" readOnly={true} style={{ fontFamily: 'monospace' }}>
          {JSON.stringify(result.data, null, 2)}
        </textarea>
      </div>
    )
  }

  return (
    <div>
      <Grid
        data={result.data as object[][]}
        columns={result.meta.fields ?? Object.keys(result.data[0] as object)}
        pagination={{ enabled: true, limit: 10 }}
      />
    </div>
  )
}

type OutputModeControlProps = {
  mode: OutputMode
  setMode: (newMode: OutputMode) => void
}

function OutputModeControl({ mode, setMode }: OutputModeControlProps) {
  return (
    <div className="field">
      <div className="control">
        <label className="radio">
          <input
            className="radio"
            type="radio"
            name="csv__output-mode"
            checked={mode === 'json'}
            onChange={() => setMode('json')}
          />
          <span className="pl-1">JSON</span>
        </label>
        <label className="radio">
          <input
            className="radio"
            type="radio"
            name="csv__output-mode"
            checked={mode === 'gridjs'}
            onChange={() => setMode('gridjs')}
          />
          <span className="pl-1">Table</span>
        </label>
      </div>
    </div>
  )
}

type ParserSettingsProps = {
  withHeaders: boolean
  setWithHeaders: (opt: boolean) => void
}

function ParserSettings({ withHeaders, setWithHeaders }: ParserSettingsProps) {
  const update = (_: FormEvent<HTMLInputElement>): void => {
    setWithHeaders(!withHeaders)
  }

  return (
    <div className="field">
      <div className="control">
        <label className="checkbox">
          <input type="checkbox" className="checkbox" onChange={update} />
          <span className="pl-1">Headers?</span>
        </label>
      </div>
    </div>
  )
}
