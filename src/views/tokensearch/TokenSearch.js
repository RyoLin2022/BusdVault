import React, { useState } from 'react'
import { CCardHeader, CCard, CCardBody, CCol, CRow, CWidgetStatsA, CButton } from '@coreui/react'
import './TokenSearch.css'

const Dashboard = () => {
  async function searchToken() {
    let CA = document.getElementById('tokenCA')
    let CAStr = String(CA.value)
    let CAStrLink = `https://dexscreener.com/bsc/${CAStr}?embed=1&trades=1`
    let chart = document.getElementById('dexscreener-embed-search')
    let htmlString = '<iframe src=' + `'${CAStrLink}'` + '>/iframe>'
    chart.innerHTML = htmlString
  }
  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>
              <input id="tokenCA" placeholder="Search Token"></input>
            </CCol>
            <CCol>
              <CButton onClick={searchToken}>Search</CButton>
            </CCol>
            <CCol></CCol>
            <CCol></CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <div id="dexscreener-embed-search"></div>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
