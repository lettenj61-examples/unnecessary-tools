import { nanoid } from 'nanoid'
import { FormEvent, useState } from 'react'

const NANOID_DEFAULT_SIZE = 10
const NANOID_GITHUB_URL = 'https://github.com/ai/nanoid'

export type Props = {
  idLength?: number
}

export default function NanoidGenerator(props: Props) {
  const [idLength, setIdLength] = useState(props.idLength ?? NANOID_DEFAULT_SIZE)
  const [output, setOutput] = useState('')

  const generateNanoid = () => {
    const val = nanoid(idLength)
    setOutput(val)
  }

  const onNumberChange = (e: FormEvent<HTMLInputElement>) => {
    setIdLength(e.currentTarget.valueAsNumber)
  }

  return (
    <>
      <p className="subtitle">
        Generate{' '}
        <a href={NANOID_GITHUB_URL} target="_blank" rel="noopener noreferrer">
          Nano ID
        </a>
      </p>
      <p className="block">Set size between 4 and 32</p>
      <div className="field has-addons">
        <p className="control">
          <button className="button is-static is-medium">Size</button>
        </p>
        <p className="control">
          <input
            type="number"
            className="input is-medium"
            placeholder="Set size of ID"
            min="4"
            max="32"
            value={idLength}
            onChange={onNumberChange}
          />
        </p>
      </div>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <input readOnly type="text" className="input is-medium" value={output} />
        </div>
        <div className="control">
          <button className="button is-primary is-medium" onClick={generateNanoid}>
            Generate
          </button>
        </div>
      </div>
    </>
  )
}
