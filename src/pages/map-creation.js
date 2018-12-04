import React from 'react'
import { Link } from 'gatsby'
import Logo from '../images/validationClick.svg'
import Valide from '../images/valide.svg'
import Exit from '../images/exitButton.svg'
import Trash from '../images/trash.svg'
import Watch from '../images/watch.svg'
import { navigate } from "gatsby"
import firebase from '../config.js'

  var snap;
  var result = false;
  var resultTitle ="";
  var account = "";
  var Display="none";
  var value;

export default class MapCreation extends React.Component {

  constructor(){
   super()
   this.state = {
                 value: '',
                 Mcolor:'',
                 Lcolor:"",
                 Snap:[],
                 Status:false,
                 ResultTitle:"",
                 info:""
 };

       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);


     }

     componentDidMount(){
       let UserId = "";
       firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           var UserId = user.uid;
           let snapCheck;
           var refa = firebase.database().ref("Users");
           refa.on('value', function(snapshot) {
             snapshot.forEach(function(childSnapshot) {
               var childKey = childSnapshot.key;
               var childData = childSnapshot.val();

               if (UserId === childData.User){
                  account = childKey;
                   value = childData.map.style.value;
                  if (childData.map != undefined){

                     result = true;
                  }
               }
          });
              });

           } else {
           navigate('/')
         }
       });

     }

     handleChange(event) {
         event.preventDefault();
       this.setState({value: event.target.value});
     }

     handleSubmit(event) {
        event.preventDefault();
          var op = this.state.value;

          if (this.state.Mcolor == "" || this.state.Lcolor == ""  || this.state.value == ''){

             this.setState({info:'veuillez tout remplir'});
             Display = "inherit"
           }
            else {
              const ref = firebase.database().ref('Users/' + account + "/map");
              ref.set({
                style: this.state,
              });
                navigate('/page-2')
            }

          }

          handleWatch() {

                    const ref = firebase.database().ref('Users/' + account + "/map/style");
                    ref.set({
                      Mcolor:this.state.Mcolor,
                      Lcolor:this.state.Lcolor,
                    });
                      navigate('/page-2')
               }

      handleRemove(){
        const refOn = firebase.database().ref('Users/' + account + "/map");
        const refOut = firebase.database().ref('Users/' + account + "/coordo");
        refOn.remove();
        refOut.remove();
        console.log("remove");
        result = false;
        this.setState({Status: false});
        this.setState({info:'zone supprimer'});
        Display = "inherit"
      }


     handleMarkerColor(e) {
       e.preventDefault();
       this.setState({Mcolor: e.target.title}, ()=>{ console.log(this.state.Mcolor)});
       if(this.state.marker == e.target.title){
          e.target.style.padding = "5px";
       }
     }

     handleLineColor(e) {
        e.preventDefault();
       this.setState({Lcolor: e.target.title}, ()=>{ console.log(this.state.Lcolor)});
     }

     logout(){
       firebase.auth().signOut().then(function() {
       console.log("signout");
       navigate('/')
      }).catch(function(error) {
        console.log(error)
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


        setTimeout(() => {
        this.setState({
          Status:result,
          ResultTitle: resultTitle,
        });

      }, 1000);





    return (
      <div className="firstPage">

        <div  onClick={this.toogleClass.bind(this)} style={{display:Display}} className="info-user">
        {this.state.info}
        </div>

        <img className="exitStyle" onClick={this.logout.bind(this)} src={Exit} ></img>


      { this.state.Status ? (
        <div>
        <h1 className="titleZone">Ma Zone</h1>
        <h1 className="titleZoneMap">{value}</h1>
        </div>
      ) :
      (  <div>
        <h1 className="titleZone" style={{width: "70%", left:"23px"}}>Créer une map</h1>
      <input  placeholder="Ma Zone" className="inputzone" value={this.state.value} onChange={ this.handleChange} type="text" />
         </div>
    )

      }
        <div className="color-zone">
         <h3 className="title">Color Marker</h3>
         <div className="section">
         <div className="color" title={'#85A8FF'} onClick={this.handleMarkerColor.bind(this)} style={{width: '30px', height:'30px', background: '#85A8FF', display: 'inline-block'}}></div>
         <div  className="color" title={'#7BEED0'} onClick={this.handleMarkerColor.bind(this)} style={{width: '30px', height:'30px', background: '#7BEED0', display: 'inline-block'}}></div>
         <div  className="color" title={'rgb(255, 237, 0)'} onClick={this.handleMarkerColor.bind(this)} style={{width: '30px', height:'30px', background: 'rgb(255, 237, 0)', display: 'inline-block'}}></div>
         <div  className="color" title={'rgb(255, 93, 93)'} onClick={this.handleMarkerColor.bind(this)} style={{width: '30px', height:'30px', background: 'rgb(255, 93, 93)', display: 'inline-block'}}></div>
        </div>

         <h3 className="title">Color Line</h3>
          <div  className="section">
         <div  className="color" title={'#0974BF'} onClick={this.handleLineColor.bind(this)} style={{width: '30px', height:'30px', background: '#0974BF', display: 'inline-block'}}></div>
         <div   className="color" title={'#9CE2B2'} onClick={this.handleLineColor.bind(this)} style={{width: '30px', height:'30px', background: '#9CE2B2', display: 'inline-block'}}></div>
         <div  className="color" title={'rgb(255, 237, 0)'} onClick={this.handleLineColor.bind(this)} style={{width: '30px', height:'30px', background: 'rgb(255, 237, 0)', display: 'inline-block'}}></div>
         <div  className="color" title={'#FFA066'} onClick={this.handleLineColor.bind(this)} style={{width: '30px', height:'30px', background: '#FFA066', display: 'inline-block'}}></div>
         </div>
        </div>

            { this.state.Status ? ( <div className="div-button-true">
              <img className="button-true" src={Watch} style={{left:'50px'}} onClick={this.handleWatch.bind(this)} ></img>
              <img className="button-true" src={Trash} style={{right:'50px'}} onClick={this.handleRemove.bind(this)} ></img>
              </div>
            ) :
            (<img className="logo-center" src={Valide} onClick={this.handleSubmit} ></img>)

            }





      </div>

          )
     }
}
