import '../styles/bunch.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import Layout from '../components/layout'
import '../etc/setup'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W3H6QTM');
          `,
        }}
      />

      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W3H6QTM" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
      </noscript>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
