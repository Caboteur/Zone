import React from 'react'
import { Link } from 'gatsby'
import Logo from '../images/zoneLogo.svg'
import SignIn from '../images/Login.svg'
import SignUp from '../images/inscription.svg'
import firebase from '../config.js'
import { navigate } from "gatsby"

var Display = "none";

export default class  MainmobileMobile extends React.Component {

  constructor(){
   super()
   this.state = {
                 email: '',
                 password:'',
                 display:"none",
                 info:"",
 };

       this.handleChangeMail = this.handleChangeMail.bind(this);
       this.handleChangePass = this.handleChangePass.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       this.handleSubmitConnect = this.handleSubmitConnect.bind(this);

     }



     handleChangeMail(event) {
       this.setState({email: event.target.value});
     }

     handleChangePass(event) {
       this.setState({password: event.target.value});
     }


            handleSubmit = async event => {
              this.setState({info:'erreur de connection'});
              event.preventDefault();
              try {
                await  firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
                firebase.auth().onAuthStateChanged(function(user) {
                  if (user) {
                    var UserId = user.uid;
                    const refi = firebase.database().ref("Users");
                    refi.push({
                      User: UserId,
                    });
                  }
                })
                navigate('/map-creation');
              } catch (error) {
                Display = "inherit"
              }
            };




       handleSubmitConnect = async event => {
         this.setState({info:'erreur de connection'});
         event.preventDefault();
         try {
           await  firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
           navigate('/map-creation');
         } catch (error) {
           Display = "inherit"
         }
       };


     handleChangePassword(event){
       event.preventDefault();
       this.setState({info:'veuillez entrez votre email!'});
       firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
    }).catch(function(error) {
      Display = "inherit"
    });
     }

     toogleClass(){
       if(Display == "none"){
        Display = 'inherit';
       }else{
         Display = "none";
       }
     }

  render() {
    return (
      <div className="firstPage">

      <div  onClick={this.toogleClass.bind(this)} style={{display:Display}} className="info-user">
      {this.state.info}
      </div>
        <img className="logo-mobile" src={Logo}></img>
        <input className="input" placeholder="email" value={this.state.email} onChange={ this.handleChangeMail} type="text" />
        <input className="input" type="password" placeholder="mot de passe" value={this.state.password} onChange={ this.handleChangePass}  />
        <img className="boutton" src={SignIn} onClick={this.handleSubmitConnect}></img>
        <img className="boutton" src={SignUp} onClick={this.handleSubmit}></img>
        <h2 className="mdp-forget" style={{fontSize: "19px"}} onClick={this.handleChangePassword.bind(this)}>Mot de passe oublié</h2>
      </div>

          )
     }
}
