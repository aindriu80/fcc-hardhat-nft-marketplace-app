import "../styles/globals.css"
import Head from "next/head"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import { Notification, NotificationProvider } from "web3uikit"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

// const APP_ID = process.env.NEXT_PUBLIC_APP_ID
// const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/26581/nft-marketplace/v0.1",
})

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>NextJS NFT Marketplace</title>
                <meta name="description" content="NFT Marketplace App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <ApolloProvider client={client}>
                    <NotificationProvider>
                        <Header />
                        <Component {...pageProps} />
                    </NotificationProvider>
                </ApolloProvider>
            </MoralisProvider>
        </>
    )
}

export default MyApp
