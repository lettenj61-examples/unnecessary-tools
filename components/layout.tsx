import { ReactNode } from 'react'
import Navigation from './navigation'

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{props.children}</main>
    </>
  )
}
