import styles from "../styles/Home.module.css"

export default function Home() {
    // How do we  show the recently listed NFT's
    // we will read from a database that has all the mappings in an
    // easier to read structure

    // We will index the events off-chain and then read our database.
    // Setup a server to listen for those events to be fired, and we will add them to a database to query.

    // TheGraph does this in a decentralized way
    // Moralis does it in a centralized way and comes with a ton of other features.

    return (
        <div className={styles.container}>
            <h2>Dia duit Domhanda!</h2>
        </div>
    )
}
