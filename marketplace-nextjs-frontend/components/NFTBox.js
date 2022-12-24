import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/BasicNft.json"
import Image from "next/image"
import { Card } from "web3uikit"
import { ethers } from "ethers"

const truncateSt = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr

    const separator = "..."
    let seperatorLength = seperator.length
    const charsToShow = strLen - seperatorLength
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return (
        fullStr.subString(0, frontChars) +
        seperator +
        fullStr.subString(fullStr.length - backChars)
    )
}

export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const { isWeb3Enabled, account } = useMoralis()
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")

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
            setTokenName(tokenURIResponse.name)
            setTokenDescription(tokenURIResponse.description)
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

    const isOwnedByOwner = seller === account || seller === undefined
    const formattedSellerAddress = isOwnedByUSer ? "you" : truncateStr(seller || "", 15)

    return (
        <div>
            <div>
                {imageURI ? (
                    <Card title={tokenName} description={tokenDescription}>
                        <div className="p-2">
                            <div className="flex flex-col items-end gap-2"></div>
                            <div># {tokenId}</div>
                            <div className="text-sm italic">Owned by the {seller}</div>
                            <Image
                                loader={() => imagURI}
                                src={imageURI}
                                height="200"
                                width="200"
                            />
                            <div clasName="font-bold">
                                {ethers.utils.formatUnits(price, "ether")}ETH
                            </div>
                        </div>
                    </Card>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}
