import React, { useState } from 'react'
import { CRow, CCard, CCardHeader, CCardBody, CButton, CCol } from '@coreui/react'
import './Mint.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
let currentAccount = sessionStorage.getItem('Account')
let accAllowance = Number(0)
const Mint = () => {
  const [copied, setCopied] = useState(false)
  let refLink = null
  let refAccount = null
  let BusdContract = '0x4F3775617aB942b4395d8A3A2e80ffDb08028c13'
  let IDOContract = '0x13E8d3BC55BA39b121cdBF679b5a9FA09B6daA9F'
  console.log('Mint page' + currentAccount)
  function alertCopied() {
    alert('Invitation link has been copied!!')
  }
  async function GetData() {
    GenerateLink()
    CheckApproval()
    GetRef()
    seeRef()
  }

  async function setAccountCorrectly() {
    currentAccount = sessionStorage.getItem('Account')
    console.log('successfully set account to ' + currentAccount)
  }
  async function makeCheck() {
    setAccountCorrectly()
    if (currentAccount === null) {
      alert('no account detected, please connect your wallet again')
    } else {
      GetData()
      let checkBTN = document.getElementById('checkButton')
      checkBTN.hidden = true
    }
  }
  /*------------------Here's the token Approval-----------------*/
  /*------------------Here's the token Approval-----------------*/
  /*------------------Here's the token Approval-----------------*/
  async function ApproveToken() {
    setAccountCorrectly()
    CheckApproval()
    if (currentAccount === null) {
      alert('no account detected!!')
    }
    accAllowance = parseInt(accAllowance)
    if (accAllowance === 0) {
      let inputGasPrice = await window.ethereum.request({
        method: 'eth_gasPrice',
      })
      let inputData =
        '0x095ea7b3000000000000000000000000' +
        IDOContract.substring(2, IDOContract.length) +
        '0000000000000000000000000000000000000000204fce5e3e25026110000000'
      let params = [
        {
          from: currentAccount,
          to: BusdContract,
          gas: Number(300000).toString(16), // 30400
          gasPrice: inputGasPrice, // 10000000000
          value: '0', // 2441406250
          data: inputData,
        },
      ]

      var ApproveBTN = document.getElementById('approveButton')
      let result = window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params,
        })
        .then((ApproveBTN.innerText = 'Approving...'))
        .catch((err) => {
          ApproveBTN.innerText = 'Approve BUSD'
          console.log(err)
        })

      setTimeout(function () {
        console.log('The first log delay 20 second')
        CheckApproval()
      }, 20000)

      setTimeout(function () {
        console.log('The second log delay 40 second')
        CheckApproval()
      }, 40000)
    }
  }

  /*------------------Checck the allowance for Mint contract-----------------*/
  /*------------------Checck the allowance for Mint contract-----------------*/
  /*------------------Checck the allowance for Mint contract-----------------*/
  async function CheckApproval() {
    setAccountCorrectly()
    console.log('Checking Approval' + accAllowance)
    let inputdata =
      '0xdd62ed3e' +
      '000000000000000000000000' +
      currentAccount.substring(2, currentAccount.length) +
      '000000000000000000000000' +
      IDOContract.substring(2, IDOContract.length)
    accAllowance = await window.ethereum.request({
      method: 'eth_call',
      params: [
        {
          to: BusdContract,
          data: inputdata,
          //allowance:0xdd62ed3e
          //BalanceOF + staking contract address
        },
        'latest',
      ],
    })
    console.log('Checking Approval' + accAllowance)
    let idoButton = document.getElementById('idoButton')
    let approved = document.getElementById('approveButton')
    if (accAllowance > 0) {
      // approveButton.innerText = 'Approved'
      approved.hidden = true
      idoButton.hidden = false
    } else {
      approved.hidden = false
      idoButton.hidden = true
    }
  }
  async function seeRef() {
    let RefAddr = sessionStorage.getItem('RefAccount')
    console.log('seeRef : ' + RefAddr)
  }
  /*---------------------------GenerateLink------------------------------*/
  /*---------------------------GenerateLink------------------------------*/
  /*---------------------------GenerateLink------------------------------*/
  async function GenerateLink() {
    let link = window.location.href
    //link = 'DNS server/#/investment/ido?invitedBy=' + currentAccount
    if (link.includes('tokenpocket')) link = link.substring(0, link.length - 23)
    if (link.length > 60) link = link.substring(0, link.length - 42) + currentAccount
    else link = link + '?invitedBy=' + currentAccount
    refLink = link
  }
  async function GetRef() {
    let link = window.location.href
    if (link.includes('invitedBy=')) {
      let start = link.indexOf('By=')
      refAccount = link.substring(start + 3, start + 45)
    } else {
      refAccount = '0x0000000000000000000000000000000000000000'
    }
    sessionStorage.setItem('RefAccount', refAccount)
  }
  async function makeIDO() {
    setAccountCorrectly()
    accAllowance = parseInt(accAllowance)
    CheckApproval()
    console.log(accAllowance)
    if (accAllowance === 0) {
      console.log('No accAllowance')
      let idoButton = document.getElementById('idoButton')
      let ApproveBTN = document.getElementById('approveButton')
      ApproveBTN.hidden = false
      idoButton.hidden = true
    } else {
      console.log('accAllowance > 0')
    }
  }
  async function claimToken() {
    //Do nothing
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CCol>
            <CRow className="sameRow">
              <div id="getStatus">
                <CButton
                  color="primary"
                  variant="outline"
                  className="sameRowRight"
                  id="checkButton"
                  onClick={makeCheck}
                >
                  Get My Status
                </CButton>
              </div>
              <div id="approve">
                <CButton
                  color="primary"
                  variant="outline"
                  className="sameRowRight"
                  id="approveButton"
                  onClick={ApproveToken}
                  hidden
                >
                  Approve BUSD
                </CButton>
              </div>
              <div id="makeido">
                <CButton
                  color="primary"
                  variant="outline"
                  className="sameRowRight"
                  id="idoButton"
                  onClick={makeIDO}
                  hidden
                >
                  Make Mint
                </CButton>
              </div>
              <div id="makeclaim">
                <CButton
                  color="primary"
                  variant="outline"
                  className="sameRowRight"
                  id="claimButton"
                  onClick={claimToken}
                  hidden
                >
                  Claim Token
                </CButton>
              </div>
            </CRow>
          </CCol>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <h1 className="sameRowLeft">Mint Dashboard</h1>
          </CRow>
          <p>
            The BUSD Vault is an innovative token having a vault. <br />
            The vault provides a base price of the token which decreases the chance of dumping.
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <span className="h5">Mint progress</span>
                </th>
                <th>
                  <span className="h5" id="idoCABalance">
                    0
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="h5">Mint per person</span>
                </td>
                <td>
                  <span className="h5">100 BUSD</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="h5">Your Balance</span>
                </td>
                <td>
                  <span className="h5" id="idoAccBalance">
                    0
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="h5">Your Referrals</span>
                </td>
                <td>
                  <span className="h5">0</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="h5">Your Earnings</span>
                </td>
                <td>
                  <span className="h5">0</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="h5">Your Referral Link</span>
                </td>
                <td>
                  <CopyToClipboard text={refLink} onCopy={() => setCopied(true)}>
                    <CButton color="primary" id="inviteLink" onClick={alertCopied}>
                      Copy Link
                    </CButton>
                  </CopyToClipboard>
                </td>
              </tr>
            </tbody>
          </table>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          <h1 className="sameRowLeft">Mechanism</h1>
        </CCardHeader>
        <CCardBody>
          <p>
            Marketing
            <br />
            BUSD Vault
            <br />
            LP Reward
            <br />
            Burn
          </p>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Mint
