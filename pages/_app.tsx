import { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {

    // @ts-ignore
    import("bootstrap/dist/js/bootstrap");

  }, []);

  return <Component {...pageProps} />
}
