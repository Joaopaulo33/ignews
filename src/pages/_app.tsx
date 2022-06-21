import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import {SessionProvider as NextAuthProvider} from 'next-auth/react'
import Head from 'next/head'

import '../styles/global.scss'

function Myapp({Component, pageProps}:AppProps) {
    return (
        <NextAuthProvider session={pageProps.session}>
            <Head>
                 <title>ig.news</title>
            </Head>
            <Header/>
            <Component{...pageProps}/>
        </NextAuthProvider>
        )
}

export default Myapp