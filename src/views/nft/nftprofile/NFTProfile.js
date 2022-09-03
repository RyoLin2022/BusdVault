import { Wallet } from 'ethers'
import React, { useEffect, useState } from 'react'
import NFTContainer from './NFTContainer'
import './NFTProfile.css'

let currentAccount
const NFTProfile = () => {
  const [WalletAddress, setWalletAddress] = useState(null)
  const [nfts, setNfts] = useState([])
  async function connect1() {
    let sNFT = document.getElementById('specificNFT')
    sNFT.value = null
    console.log('nft profile connect')
    currentAccount = sessionStorage.getItem('Account')
    setWalletAddress(currentAccount)
    getNFTData()
  }
  async function connect2() {
    console.log('nft profile connect')
    currentAccount = sessionStorage.getItem('Account')
    setWalletAddress(currentAccount)
    getNFTData()
  }
  const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-Key': 'test' } }
  const getNFTData = async () => {
    if (!WalletAddress) return
    let sNFT = document.getElementById('specificNFT')
    let NFTAddress = String(sNFT.value)
    if (NFTAddress.length === 42) {
      const response = await fetch(
        `https://deep-index.moralis.io/api/v2/${WalletAddress}/nft?chain=eth&format=decimal&token_addresses=${NFTAddress}`,
        options,
      )
      console.log(response)
      const data = await response.json()
      console.log(data)
      setNfts(data.result)
    } else {
      const response = await fetch(
        `https://deep-index.moralis.io/api/v2/${WalletAddress}/nft?chain=eth&format=decimal`,
        //`https://deep-index.moralis.io/api/v2/${WalletAddress}/nft?chain=eth&format=decimal&token_addresses=0x17eb72390dcc2755692056363b0f61ea2cd1873d`,
        options,
      )
      console.log(response)
      const data = await response.json()
      console.log(data)
      setNfts(data.result)
    }
    debugger
  }

  useEffect(() => {
    getNFTData()
  }, [WalletAddress])

  return (
    <div className="NFTProfile">
      <button onClick={connect1}>Check All of My NFT</button>
      <br />
      <br />
      <button onClick={connect2}>Check Particular NFT</button>
      <input id="specificNFT" placeholder="Put NFT CA right here"></input>
      {/* <NFTContainer nfts={nfts} /> */}
    </div>
  )
}

export default NFTProfile
