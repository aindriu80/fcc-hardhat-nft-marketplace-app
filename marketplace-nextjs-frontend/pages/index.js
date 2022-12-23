import styles from "../styles/Home.module.css"
import { useMoralisQuery } from "react-moralis"
import NFTBox from "../components/NFTBox"

export default function Home() {
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery
    // TableName
    // Function for the query
    "ActiveItem", (query) => query.listed(10).descending("tokenId")
    console.log(listedNFts)
    return (
        <div className="container mx-auto">
            <h1 className="px-4 py-4 text-2xl font-bold ">Recently Listed</h1>
            <div className="flex flex-wrap">
                {fetchingListedNfts ? (
                    <div>Loading...</div>
                ) : (
                    listedNfts.map((nft) => {
                        console.log(nft.attributes)
                        const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                            nft.attributes
                        return (
                            <div>
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                    key={`${nftAddress}${tokenId}`}
                                />
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
