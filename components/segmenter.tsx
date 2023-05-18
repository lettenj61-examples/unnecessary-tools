import { useState } from 'react'
import TinySegmenter from '../lib/tinysegmenter'

const tinySegmenter = new TinySegmenter()

export default function Segmenter() {
  const [segmentsText, setSegmentsText] = useState('')
  const [input, setInput] = useState('')

  const onClickSegment = () => {
    const data = tinySegmenter.segment(input)
    setSegmentsText(() => JSON.stringify(data))
  }

  return (
    <>
      <p className="subtitle">Segmenter</p>
      <div className="field has-addons">
        <p className="control is-expanded">
          <input
            type="text"
            className="input is-medium"
            placeholder="Enter some text"
            onInput={e => setInput(() => e.currentTarget ? e.currentTarget.value : '')}
          />
        </p>
        <p className="control">
          <button className="button is-info is-medium" onClick={onClickSegment}>Segment</button>
        </p>
      </div>
      <div>
        <blockquote>{segmentsText}</blockquote>
      </div>
    </>
  )
}
