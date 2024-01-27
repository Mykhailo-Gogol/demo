/* eslint-disable @next/next/no-title-in-document-head */
import { appConfig } from '@/utils'
import { Html, Head, Main, NextScript } from 'next/document'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function Document() {
  return (
    <Html lang="en" data-theme={appConfig.defaultTheme}>
      <Head>
        <title>This page has a title 🤔</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <body>
        <Main />
        <NextScript />

        <Analytics />
        <SpeedInsights />
      </body>
    </Html>
  )
}
