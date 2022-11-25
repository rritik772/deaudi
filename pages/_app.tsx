import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';

import 'windi.css'
import '../styles/globals.css'

import Navbar from '../components/Navbar/Navbar';
import { ContractProvider } from '../context/BlockchainContext';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import TrackModal from '../modals/Tracks';

export default function App({ Component, pageProps }: AppProps) {
  const [tracks, setTracks] = useState<TrackModal[]>([]);

  useEffect(() => {
    if (tracks.length > 0) {
      console.log(tracks)
      pageProps = { ...pageProps, tracks }
    }
  }, [tracks])

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
        <Navbar trackSetter={(e) => setTracks(e)} />
        <div className="mb-2" />
        <Component {...pageProps} />
      </ContractProvider>
    </div>
  )
}
