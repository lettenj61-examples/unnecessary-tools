import Link from 'next/link'

export default function Navigation(): JSX.Element {
  return (
    <header>
      <nav className="navbar is-light is-active">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link href="/">
              <a className="has-text-dark"><strong>un::tools</strong></a>
            </Link>
          </div>
        </div>

        <div className="navbar-menu is-active">
          <div className="navbar-start">
            <Link href="/text">
              <a className="navbar-item">Text</a>
            </Link>
            <Link href="/datetime">
              <a className="navbar-item">Date Time</a>
            </Link>
            <Link href="/elm">
              <a className="navbar-item">Elm</a>
            </Link>
            <Link href="/csv">
              <a className="navbar-item">CSV</a>
            </Link>
            <Link href="/url">
              <a className="navbar-item">URL</a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}