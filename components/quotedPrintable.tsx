import React, { useMemo, useState } from 'react'
import * as qp from 'quoted-printable'
import * as utf8 from 'utf8'

const enum EncoderMode {
  NONE = 'none',
  ENCODER = 'encoder',
  DECODER = 'decoder'
}

export default function QuotedPrintable() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState(EncoderMode.NONE)
  const [lastError, setLastError] = useState<Error | null>(null)

  const result = useMemo(() => {
    if (input == null || input.length === 0) return ''

    try {
      switch (mode) {
        case EncoderMode.ENCODER:
          return qp.encode(utf8.encode(input))

        case EncoderMode.DECODER:
          return utf8.decode(qp.decode(input))

        default:
          return ''
      }
    } catch (e) {
      setLastError(e as Error)
      return (e as Error).toString()
    }
  }, [mode])

  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setLastError(null)
    setInput(e.currentTarget.value)
  }

  return (
    <>
      <p className="subtitle">Quoted Printable</p>

      <div className="field">
        <textarea className="textarea" value={input} onInput={onInput}></textarea>
      </div>

      <div className="field">
        <textarea className={lastError == null ? "textarea" : "textarea is-danger"} value={result} readOnly></textarea>
      </div>

      <div className="buttons">
        <button
          className="button is-primary"
          disabled={mode === EncoderMode.ENCODER}
          onClick={() => setMode(EncoderMode.ENCODER)}
        >Encode</button>
        <button
          className="button is-primary"
          disabled={mode === EncoderMode.DECODER}
          onClick={() => setMode(EncoderMode.DECODER)}
        >Decode</button>
        <button
          className="button is-primary"
          disabled={mode === EncoderMode.NONE}
          onClick={() => { setInput(''); setMode(EncoderMode.NONE) }}
        >Reset</button>
      </div>
    </>
  )
}