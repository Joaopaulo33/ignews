import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import {SessionProvider as NextAuthProvider} from 'next-auth/react'

import '../styles/global.scss'

function Myapp({Component, pageProps}:AppProps) {
    return (
        <NextAuthProvider session={pageProps.session}>
            <Header/>
            <Component{...pageProps}/>
        </NextAuthProvider>
        )
}

export default Myapp