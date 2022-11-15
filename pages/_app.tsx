import type { AppProps } from 'next/app'

import 'windi.css'
import '../styles/globals.css'

import Navbar from '../components/Navbar/Navbar';
import { ContractProvider } from '../context/BlockchainContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ContractProvider>
        <Navbar />
        <div className="mb-2" />
        <Component {...pageProps} />
      </ContractProvider>
    </div>
  )
}
