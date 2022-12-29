import Head from 'next/head'
import Csv from '../components/csv'
import TableCleaner from '../components/tableCleaner'

export default function Page() {
  return (
    <>
      <Head>
        <title>CSV Utilities | Unnecessary Tools</title>
      </Head>

      <section className="hero is-small">
        <div className="hero-body">
          <p className="title">Handle CSV</p>
        </div>
      </section>

      <hr />

      <section className="section">
        <div className="container">
          <Csv />

          <hr />

          <TableCleaner />
        </div>
      </section>
    </>
  )
}