import React, { useState } from 'react'
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react'
import './IDO.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
let currentAccount = localStorage.getItem('Account')
const IDO = () => {
  const [copied, setCopied] = useState(false)
  let refLink = null
  let refAccount = null
  let BusdContract = '0xdc483bBb5acC6b09ec2b9115Ef9ab3f4DD39C315'
  let IDOContract = ''
  function alertCopied() {
    alert('Invitation link has been copied!!')
  }
  GetData()
  async function GetData() {
    CheckApproval()
    GenerateLink()
    GetRef()
    seeRef()
  }
  /*------------------Checck the allowance for staking contract-----------------*/
  /*------------------Checck the allowance for staking contract-----------------*/
  /*------------------Checck the allowance for staking contract-----------------*/
  async function CheckApproval() {
    let inputdata =
      '0xdd62ed3e' +
      '000000000000000000000000' +
      currentAccount.substring(2, currentAccount.length) +
      '000000000000000000000000' +
      IDOContract.substring(2, IDOContract.length)
    let accAllowance = await window.ethereum.request({
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
    let idoButton = document.getElementById('idoButton')
    if (accAllowance > 0) {
      idoButton.innerText = 'Make IDO'
    }
  }
  async function seeRef() {
    let RefAddr = localStorage.getItem('RefAccount')
    console.log('seeRef : ' + RefAddr)
  }
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
    if (link.includes('?invitedBy=')) {
      console.log(true)
      let start = link.indexOf('=')
      refAccount = link.substring(start + 1, start + 43)
      console.log('refAccount : ' + refAccount)
    } else {
      refAccount = '0x0000000000000000000000000000000000000000'
      console.log('refAccount : ' + refAccount)
    }
    localStorage.setItem('RefAccount', refAccount)
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="sameRow">
          <h1 className="sameRowLeft">IDO Dashboard</h1>
          <CButton color="primary" variant="outline" className="sameRowRight" id="idoButton">
            Approve BUSD
          </CButton>
        </CCardHeader>
        <CCardBody>
          <p>
            The BUSD Vault is an innovative token having a vault. <br />
            The vault provides a base price of the token which decreases the chance of dumping.
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <span className="h5">IDO progress</span>
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
                  <span className="h5">IDO per person</span>
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
            Total Tax : 7%
            <br />
            Marketing : 2% <br /> BUSD Vault : 2% <br /> LP Reward : 3%
          </p>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>Inline text elements</CCardHeader>
        <CCardBody>
          <p>
            Traditional heading elements are designed to work best in the meat of your page content.
            When you need a heading to stand out, consider using a <strong>display heading</strong>
            —a larger, slightly more opinionated heading style.
          </p>
          <div className="bd-example">
            <p>
              You can use the mark tag to <mark>highlight</mark> text.
            </p>
            <p>
              <del>This line of text is meant to be treated as deleted text.</del>
            </p>
            <p>
              <s>This line of text is meant to be treated as no longer accurate.</s>
            </p>
            <p>
              <ins>This line of text is meant to be treated as an addition to the document.</ins>
            </p>
            <p>
              <u>This line of text will render as underlined</u>
            </p>
            <p>
              <small>This line of text is meant to be treated as fine print.</small>
            </p>
            <p>
              <strong>This line rendered as bold text.</strong>
            </p>
            <p>
              <em>This line rendered as italicized text.</em>
            </p>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default IDO
