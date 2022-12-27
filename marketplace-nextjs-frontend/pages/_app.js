import "../styles/globals.css"
import Head from "next/head"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import { Notification, NotificationProvider } from "web3uikit"

const APP_ID = process.env.NEXT_PUBLIC_APP_ID
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>NextJS NFT Marketplace</title>
                <meta name="description" content="NFT Marketplace App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <Header />
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </>
    )
}

export default MyApp
