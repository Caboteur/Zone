import React from 'react'
import { Link } from 'gatsby'
import Logo from '../images/LOGOFINALE.svg'
import SignIn from '../images/SignIN.svg'
import SignUp from '../images/SignOUT.svg'
import firebase from '../config.js'
import { navigate } from "gatsby"


export default class MainmobileOrdi extends React.Component {



  render() {
    return (
      <div className="firstPage">
        <div className="contain-ordi">
        <img className="logo-ordi" src={Logo}></img>

        <div style={{color:'white', fontSize:'20px', textAlign:'center'}}>Mobile Web App</div>
      </div>
      </div>

          )
     }
}
