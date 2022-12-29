import Head from 'next/head'
import { useState } from 'react'

export default function Page() {
  const [input, setInput] = useState('')
  return (
    <>
      <Head>
        <title>Elm Utilities | Unnecessary Tools</title>
      </Head>

      <div className="field">
        <label className="label">String to Elm List</label>
        <div className="control">
          <textarea
            className="textarea"
            value={input}
            onInput={(e) => setInput(e.currentTarget.value)}
          ></textarea>
        </div>
      </div>

      <div className="block">
        {(input.length > 0) && (
          <pre>
            <code>
              {toElmStringList(input)}
            </code>
          </pre>
        )}
      </div>
    </>
  )
}

function toElmStringList(str: string): string {
  const lines = str.split(/\r?\n/g)
  const stringLiterals = lines.map(
    (elem, index) => `${index === 0 ? '[' : ','} "${escapeQuotes(elem)}"`
  )

  return stringLiterals.concat([']']).join('\n')
}

function escapeQuotes(str: string): string {
  return str.replace(/\"/g, '\\"')
}
