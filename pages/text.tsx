import Head from 'next/head'
import NanoidGenerator from '../components/nanoid'
import UuidGenerator from '../components/uuid'

export default function Page() {
  return (
    <>
      <Head>
        <title>Text Utilities | Unnecessary Tools</title>
      </Head>

      <section className="hero is-small">
        <div className="hero-body">
          <p className="title">Text Utilities</p>
        </div>
      </section>

      <hr />

      <section className="section" id="nanoid">
        <div className="container">
          <NanoidGenerator />
        </div>
      </section>

      <hr />

      <section className="section" id="uuid">
        <div className="container">
          <UuidGenerator />
        </div>
      </section>
    </>
  )
}
