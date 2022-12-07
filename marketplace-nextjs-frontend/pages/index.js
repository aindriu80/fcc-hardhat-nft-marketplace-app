import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>NextJS NFT Marketplace</title>
                <meta name="description" content="NFT Marketplace App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h2>Dia duit Domhanda!</h2>
        </div>
    )
}
