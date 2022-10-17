import Csv from '../components/csv'

export default function Page() {
  return (
    <>
      <section className="hero is-small">
        <div className="hero-body">
          <p className="title">Handle CSV</p>
        </div>
      </section>

      <hr />

      <section className="section">
        <div className="container">
          <Csv />
        </div>
      </section>
    </>
  )
}