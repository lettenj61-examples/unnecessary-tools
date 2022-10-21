import { NextPage } from 'next'
import { useMemo, useState } from 'react'

const Page: NextPage = () => {
  const [urlString, setUrlString] = useState('')

  const [output, status] = useMemo(() => {
    if (urlString !== '') {
      const [parseError, result] = cleanAmazonUrl(urlString)
      if (parseError != null) {
        return [parseError.message, 'error']
      } else {
        return [result, 'success']
      }
    }
    return ['', 'idle']
  }, [urlString])

  let outputClassName = 'notification'
  if (status === 'error') {
    outputClassName += ' is-danger'
  } else if (status === 'success') {
    outputClassName += ' is-success'
  }

  return (
    <>
      <section className="hero is-small">
        <div className="hero-body">
          <h1 className="title">URL Utilities</h1>
        </div>
      </section>

      <hr />

      <section className="section" id="amazon-url">
        <div className="container">
          <div className="field">
            <label className="label">Amazon URL</label>
            <p className="control">
              <input
                type="text"
                className="input"
                onChange={e => setUrlString(e.currentTarget.value)}
              />
            </p>
          </div>
          <div className={outputClassName}>
            {output.length ? (
              <a href={output} target="_blank">
                {output}
              </a>
            ) : (
              'Type some URL first!'
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Page

type CleanResult = [null, string] | [Error, null]

function cleanAmazonUrl(url: string): CleanResult {
  try {
    const parsed = new URL(url)
    const segments = parsed.pathname.split('/')
    const dpIndex = segments.indexOf('dp')

    if (dpIndex === -1) {
      return [new Error('path /dp/ not found'), null]
    }

    const productId = segments[dpIndex + 1]
    if (productId == null) {
      return [new Error('no product ID found'), null]
    }

    const cleanUrl = [parsed.origin, 'dp', productId].join('/')

    return [null, cleanUrl]
  } catch (err) {
    return [err as Error, null]
  }
}
