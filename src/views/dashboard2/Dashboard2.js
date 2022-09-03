import React, { useState } from 'react'
import { CCardHeader, CCard, CCardBody, CCol, CRow, CWidgetStatsA, CButton } from '@coreui/react'
import './Dashboard2.css'

const Dashboard = () => {
  /*-----useState settings-------*/
  const [token1Data, setToken1Data] = useState(null)
  const [token2Data, setToken2Data] = useState(null)
  const [token3Data, setToken3Data] = useState(null)
  const [token4Data, setToken4Data] = useState(null)

  /*-----Token Address Settings--------*/
  let token1 = '0xad6742a35fb341a9cc6ad674738dd8da98b94fb1'
  let token2 = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
  let token3 = '0x156ab3346823b651294766e23e6cf87254d68962'
  let token4 = '0x965f527d9159dce6288a2219db51fc6eef120dd1'
  let token1url = `https://dexscreener.com/bsc/${token1}?embed=1&trades=0`
  let token2url = `https://dexscreener.com/bsc/${token2}?embed=1&trades=0`
  let token3url = `https://dexscreener.com/bsc/${token3}?embed=1&trades=0`
  let token4url = `https://dexscreener.com/bsc/${token4}?embed=1&trades=0`
  getDatas()
  async function getDatas() {
    getData()
    getData2()
    getData3()
    getData4()
  }
  async function getData() {
    const response = await fetch(`https://api.dexscreener.io/latest/dex/tokens/${token1}`)
    const data = await response.json()
    console.log(data)
    setToken1Data(data.pairs[0])
    setData()
  }
  async function setData() {
    let tokenprice = document.getElementById('token1-price')
    let tokenname = document.getElementById('token1-name')
    tokenprice.innerText = token1Data.priceUsd
    tokenname.innerText = token1Data.baseToken.symbol
  }
  async function getData2() {
    const response = await fetch(`https://api.dexscreener.io/latest/dex/tokens/${token2}`)
    const data = await response.json()
    setToken2Data(data.pairs[0])
    setData2()
  }
  async function setData2() {
    let tokenprice = document.getElementById('token2-price')
    let tokenname = document.getElementById('token2-name')
    tokenprice.innerText = token2Data.priceUsd
    tokenname.innerText = token2Data.baseToken.symbol
  }
  async function getData3() {
    const response = await fetch(`https://api.dexscreener.io/latest/dex/tokens/${token3}`)
    const data = await response.json()
    setToken3Data(data.pairs[0])
    setData3()
  }
  async function setData3() {
    let tokenprice = document.getElementById('token3-price')
    let tokenname = document.getElementById('token3-name')
    tokenprice.innerText = token3Data.priceUsd
    tokenname.innerText = token3Data.baseToken.symbol
  }
  async function getData4() {
    const response = await fetch(`https://api.dexscreener.io/latest/dex/tokens/${token4}`)
    const data = await response.json()
    console.log(data)
    setToken4Data(data.pairs[0])
    setData4()
  }
  async function setData4() {
    let tokenprice = document.getElementById('token4-price')
    let tokenname = document.getElementById('token4-name')
    tokenprice.innerText = token4Data.priceUsd
    tokenname.innerText = token4Data.baseToken.symbol
  }
  async function charttoken1() {
    let chart = document.getElementById('dexscreener-embed')
    let htmlString = '<iframe src=' + `'${token1url}'` + '>/iframe>'
    chart.innerHTML = htmlString
  }
  async function charttoken2() {
    let chart = document.getElementById('dexscreener-embed')
    let htmlString = '<iframe src=' + `'${token2url}'` + '>/iframe>'
    chart.innerHTML = htmlString
  }
  async function charttoken3() {
    let chart = document.getElementById('dexscreener-embed')
    let htmlString = '<iframe src=' + `'${token3url}'` + '>/iframe>'
    chart.innerHTML = htmlString
  }
  async function charttoken4() {
    let chart = document.getElementById('dexscreener-embed')
    let htmlString = '<iframe src=' + `'${token4url}'` + '>/iframe>'
    chart.innerHTML = htmlString
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <p>
              Here, we show the hot pairs <br />
              50% of the income of advertising will be used to buyback our token
            </p>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm={6} lg={3} onClick={charttoken1}>
              <CWidgetStatsA
                className="mb-4"
                color="primary"
                value={
                  <>
                    <p id="token1-price">0</p>
                    {''}
                  </>
                }
                title={
                  <>
                    <p id="token1-name">0</p>
                  </>
                }
              />
            </CCol>
            <CCol sm={6} lg={3} onClick={charttoken2}>
              <CWidgetStatsA
                id="BNB"
                className="mb-4"
                color="info"
                value={
                  <>
                    <p id="token2-price">0</p>
                    {''}
                  </>
                }
                title={
                  <>
                    <p id="token2-name">0</p>
                  </>
                }
              />
            </CCol>
            <CCol sm={6} lg={3} onClick={charttoken3}>
              <CWidgetStatsA
                className="mb-4"
                color="warning"
                value={
                  <>
                    <p id="token3-price">0</p>
                    {''}
                  </>
                }
                title={
                  <>
                    <p id="token3-name">0</p>
                  </>
                }
              />
            </CCol>
            <CCol sm={6} lg={3} onClick={charttoken4}>
              <CWidgetStatsA
                className="mb-4"
                color="danger"
                value={
                  <>
                    <p id="token4-price">0</p>
                    {''}
                  </>
                }
                title={
                  <>
                    <p id="token4-name">0</p>
                  </>
                }
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={5}>
              <h4 id="ChartName" className="card-title mb-0">
                Price Chart
              </h4>
            </CCol>
            <div id="dexscreener-embed">
              <iframe src={token1url}></iframe>
            </div>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
