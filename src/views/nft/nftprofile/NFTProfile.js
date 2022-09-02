import React, { useEffect, useState } from 'react'
import NFTContainer from './NFTContainer'
import './NFTProfile.css'

let currentAccount
const NFTProfile = () => {
  const [WalletAddress, setWalletAddress] = useState(null)
  const [nfts, setNfts] = useState([])

  async function connect() {
    console.log('nft profile connect')
    currentAccount = sessionStorage.getItem('Account')
    setWalletAddress(currentAccount)
  }
  const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': 'test' } }
  const getNFTData = async () => {
    if (!WalletAddress) return
    const response = await fetch(
      `https://deep-index.moralis.io/api/v2/${WalletAddress}/nft?chain=eth&format=decimal`,
      //`https://deep-index.moralis.io/api/v2/${WalletAddress}/nft?chain=eth&format=decimal&token_addresses=0x17eb72390dcc2755692056363b0f61ea2cd1873d`,
      options,
    )
    // const response = await fetch(
    //   `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${WalletAddress}`,
    // )
    console.log('get response')
    console.log(response)
    const data = await response.json()
    console.log(data)
    setNfts(data.result)
    debugger
  }

  useEffect(() => {
    getNFTData()
  }, [WalletAddress])

  return (
    <div className="NFTProfile">
      <div>Account : {WalletAddress}</div>
      <button onClick={connect}>Connect Wallet</button>
      <NFTContainer nfts={nfts} />
    </div>
  )
}

export default NFTProfile
