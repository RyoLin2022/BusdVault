import React from 'react'

let link = null
let meta = null
const NFTCard = ({ nft }) => {
  async function getMeta() {
    meta = String(nft.metadata)
    if (meta !== null) {
      if (meta.includes('Qm')) {
        let metaIndex = meta.indexOf('Qm')
        meta = meta.substring(metaIndex, metaIndex + 58)
        let semiIndex = meta.indexOf('"')
        meta = meta.substring(0, semiIndex)
        if (link === null || link === link) {
          link = 'https://ipfs.io/ipfs/' + meta
          nft.metadata = link
        }
      } else if (meta.includes('https')) {
        let metaIndex = meta.indexOf('https')
        meta = meta.substring(metaIndex, metaIndex + 100)
        let semiIndex = meta.indexOf('"')
        meta = meta.substring(0, semiIndex)
        if (link === null || link === link) {
          link = meta
          nft.metadata = link
        }
      } else {
        link = 'https://gateway.pinata.cloud/ipfs/QmPhgiUmGp7tdqnyFgUfeyWEzaHyvavPkyCYcNgvT1fkCT'
      }
    }
  }
  getMeta()
  return (
    <div className="card nft-card">
      <img src={nft.metadata} className="nft-image" />
      <div className="card content">
        <div className="card content-item">Contract Address :</div>
        <div className="card">{nft.token_address}</div>
        <div className="card content-item">NFT Name :</div>
        <div className="card">{nft.name}</div>
      </div>
    </div>
  )
}

export default NFTCard
