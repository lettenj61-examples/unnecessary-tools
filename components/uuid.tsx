import { useState } from 'react'
import * as uuid from 'uuid'

export default function UuidGenerator() {
  const [output, setOutput] = useState('')

  const generateUuid = () => {
    const val = uuid.v4()
    setOutput(val)
  }

  return (
    <>
      <p className="subtitle">Generate UUID</p>

      <div className="field">
        <div className="control">
          <input readOnly type="text" className="input is-medium" value={output} />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-primary is-medium" onClick={generateUuid}>Generate</button>
        </div>
        <div className="contro">
          <button className="button is-medium">TEST</button>
        </div>
      </div>
    </>
  )
}