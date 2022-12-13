const Moralis = require("moralis/node")
require("dotenv").config()
const contractAddress = require("./constants/networkMapping.json")
let chainId = process.env.chainId || 31337
const contractAddress = contractAddressess[chainId]["NftMarketplace"]["0"]

const serverUrl = process.env.NEXT_PUBLIC_APP_ID
const appId = process.env.NEXT_SERVER_URL
const masterKey = process.env.MASTER_KEY

async function main() {
    await Moralis.start({ serverUrl, addId, masterKey })
    console.log(`Working with contract address, ${contractAddress}`)
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
