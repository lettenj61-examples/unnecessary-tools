import { useState, useMemo } from 'react'

function Paragraph() {
  const [input, setInput] = useState('')
  const output = useMemo(() => {
    const isEmpty = input.trim() === ''
    if (isEmpty) return ''

    return formatParagraph(input).join('\n')
  }, [input])

  return (
    <>
      <p className="subtitle">Clean paragraphs</p>
      <div className="field">
        <textarea className="textarea" onInput={e => setInput(e.currentTarget.value)} value={input}>
        </textarea>
      </div>
      <div className="field">
        <textarea className="textarea" readOnly={true} value={output}></textarea>
      </div>
    </>
  )
}

export default Paragraph

function formatParagraph(text: string): string[] {
  const lines = text.split(/\r?\n/g)
  return lines.reduce<{ chunk: string; buffer: string[] }>(
    (state, line) => {
      if (state.chunk !== '') {
        state.chunk += ' '
      }
      const val = line.trim()
      state.chunk += val

      if (isPeriod(val)) {
        state.buffer.push(state.chunk)
        state.chunk = ''
      }
      return state
    },
    { chunk: '', buffer: [] }
  ).buffer
}

function isPeriod(text: string): boolean {
  return text.endsWith('.') || text.endsWith('?') || text.endsWith('!')
}