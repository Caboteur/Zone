import React from 'react'
import { Link } from 'gatsby'
import Logo from '../images/zoneSvg.svg'
import SignIn from '../images/SignIN.svg'
import SignUp from '../images/SignOUT.svg'
import  MainmobileOrdi from '../components/MainmobileOrdi.js'
import  MainpageMobile from '../components/MainpageMobile.js'
import { navigate } from "gatsby"


export default class Indexpage extends React.Component {



  render() {


    return (

      <div className="firstPage">
           <MainpageMobile/>
      </div>

          )
     }
}
