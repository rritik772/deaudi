import type { AppProps } from 'next/app'

import '../styles/globals.css'

import Navbar from '../components/Navbar/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <div className="mb-2" />
      <Component {...pageProps} />
    </div>
  )
}
