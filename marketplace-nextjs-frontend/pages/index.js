import styles from "../styles/Home.module.css"
import { useMoralisQuery } from "react-moralis"

export default function Home() {
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery
    // TableName
    // Function for the query
    "ActiveItem", (query) => query.listed(10).descending("tokenId")
    console.log(listedNFts)
    return (
        <div className={styles.container}>
            {fetchingListedNfts ? (
                <div>Loading...</div>
            ) : (
                listedNfts.map((nft) => {
                    console.log(nft.attributes)
                    const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                        nft.attributes
                    return (
                        <div>
                            Price:{price}. NftAddress: {nftAddress}.seller: {seller}
                        </div>
                    )
                })
            )}
        </div>
    )
}
