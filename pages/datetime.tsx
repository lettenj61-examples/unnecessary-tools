import Head from 'next/head'
import Dayjs from '../components/day'

export default function Page() {
  return (
    <>
      <Head>
        <title>Date and Time Utilities | Unnecessary Tools</title>
      </Head>

      <section className="hero is-small">
        <div className="hero-body">
          <p className="title">Date and Time Utilities</p>
        </div>
      </section>

      <hr />

      <section className="section" id="dayjs">
        <div className="container">
          <Dayjs />
        </div>
      </section>
    </>
  )
}