/* eslint-disable @next/next/no-title-in-document-head */
// import AdBanner from '@/components/AdBanner'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>This page has a title 🤔</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID || ''}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* <AdBanner /> */}
      </body>
    </Html>
  )
}
