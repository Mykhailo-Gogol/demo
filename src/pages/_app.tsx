import "@/styles/globals.css";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { motion, useWillChange } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const willChange = useWillChange();

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ willChange }}
        >
          <div className="px-4 py-10 lg:px-24 lg:py-12">
            <Component {...pageProps} />
          </div>
        </motion.div>
        <Footer />
      </div>
    </SessionContextProvider>
  );
}
