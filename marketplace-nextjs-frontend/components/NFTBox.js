import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/BasicNft.json"

export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const { isWeb3Enabled } = useMoralis()
    const [imageURI, setImageURI] = useState("")

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    })

    async function updateUI() {
        const tokenURI = await getTokenURI()
        console.log(`The TokenUrl is ${tokenURI}`)
        if (tokenURI) {
            // IPFS Gateway: A Server that will return IPFS files from a normal URL.
            const requestURL = tokenURI.replace("ipfs://", "http://ipfs.io/ipfs/")
            const tokenURIResponse = await (await fetch(requestURL)).json()
            const imageURI = tokenURIResponse.image
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.op/opfs/")
            setImageURI(imageURIURL)
            // Possible to render image on our server
            // For Testnets & mainnet => use moralis server hooks
            // World Adopts ipfs
        }
        // get the tokenURI
        // usign the image tag from the tokenURI, get the image
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            <div>{imageURI ? <div>Found it!</div> : <img>...</img>}</div>
        </div>
    )
}
