import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';

import 'windi.css'
import '../styles/globals.css'

import Navbar from '../components/Navbar/Navbar';
import { ContractProvider } from '../context/BlockchainContext';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeButton={true}
        closeOnClick={true}
        pauseOnHover={true}
        theme="light"
      />
      <ContractProvider>
        <Navbar />
        <div className="mb-2" />
        <Component {...pageProps} />
      </ContractProvider>
    </div>
  )
}
