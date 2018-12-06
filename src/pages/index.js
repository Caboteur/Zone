import React from 'react'
import { Link } from 'gatsby'
import Logo from '../images/zoneSvg.svg'

import  MainmobileOrdi from '../components/MainmobileOrdi.js'
import  MainpageMobile from '../components/MainpageMobile.js'
import firebase from '../components/config.js'
import { navigate } from "gatsby"
import '../components/layout.css'


export default class Indexpage extends React.Component {



  render() {



     const handleMobile =  ()=>{

       if (typeof window !== 'undefined') {

    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
  ){
    return(<MainpageMobile/>)
  }
    else{
    return(<MainmobileOrdi/>)
    }

    }

  }
    return (

      <div className="firstPage">
           {handleMobile()}
      </div>

          )
     }
}
