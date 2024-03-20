import '@/styles/globals.css'
import { useState } from 'react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

import type { AppProps } from 'next/app'
import { motion, useWillChange } from 'framer-motion'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  const willChange = useWillChange()

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <div className="px-4 lg:px-24 min-h-screen flex flex-col justify-between">
          <Header />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ willChange }}
          >
            <div className="lg:py-12">
              <Component {...pageProps} />

              <Analytics />
              <SpeedInsights />
            </div>
          </motion.div>
          <Footer />
        </div>
      </QueryClientProvider>
    </SessionContextProvider>
  )
}
