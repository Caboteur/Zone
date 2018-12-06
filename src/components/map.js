import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import firebase from './config.js'
import { navigate } from "gatsby"
import Exit from '../images/exitButton.svg'
import './layout.css'

var lati = '';
var longi = '';
var tab = [];
var dataset ;
var spec;
var childKey = "-LSoY-h1aEw8L2o8bqSh";


export default class Map extends React.Component {


  constructor(props) {
    super(props);


    this.state={
      open:'true',
       coordo:[],
       myLocation:[],
       visible:'none',
       Lcolor:"",
       Mcolor:"",
    }

  }

                  handleClick(){
                    this.setState({
                      coordo:[longi,lati]
                    });
                    console.log([longi,lati])
                    tab.push([longi,lati]);
                    const ref = firebase.database().ref('Users/' + childKey + "/coordo")
                    ref.set({
                      coordo: tab,
                    });
                    console.log(tab);
                    this.setState({
                      myLocation: tab
                    }, ()=>{this.getDataViz();});
                  }



                  componentDidMount() {

                    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWJveiIsImEiOiJjamJucXhjbzc0ZXdjMnh0YnJqMWI4NmR1In0.HMv4BpyCUAid4JwcIJ9Yjg';

                    this.map = new mapboxgl.Map({
                      container: 'map',
                      style: 'mapbox://styles/adriboz/cjotycxkp1j772snvz467l92i',
                      center: [	-0.580816,44.8333], // note: lon comes before lat
                      zoom: [8.5],
                      cluster: true,
                      clusterMaxZoom: 14,
                      clusterRadius: 40
                    });

                    this.map.addControl(new mapboxgl.GeolocateControl({
                      positionOptions: {
                        enableHighAccuracy: true
                      },
                        trackUserLocation: true
                      }));

                    if (navigator.geolocation) {
                      navigator.geolocation.watchPosition(function(position) {
                        lati = position.coords.latitude;
                        longi = position.coords.longitude;
                        console.log(lati)
                      }
                    );

                  } else {
                    console.log("error")
                  }

                   this.getData();
                   setTimeout(()=>{this.getMarker()}, 3000);
                }


                async getData() {

                  try {
                    let UserId = "";

                    firebase.auth().onAuthStateChanged(function(user) {
                      if (user) {
                        console.log(user.uid)
                        var UserId = user.uid;
                        let snapCheck;
                        var refa = firebase.database().ref("Users");
                        refa.on('value', function(snapshot) {
                          snapshot.forEach(function(childSnapshot) {
                            var childData = childSnapshot.val();

                            if (UserId === childData.User){
                               spec = childData.map.style;
                               childKey = childSnapshot.key;
                               tab = childData.coordo.coordo;

                            }

                            if (childData.coordo != undefined){
                               let o= "u";
                            }
                       });
                           });



                        } else {
                        navigate('/')
                      }
                    });


                    this.setState({
                      visible: "inherit"
                    });



                  } catch (error) {
                    console.log(error);
                  }
                }




                getMarker(){
                       this.getData();
                       var to = this.map

                        console.log(tab)

                          tab.map((term)=>{
                              console.log(term[0]+"et"+term[1]);

                                    var el = document.createElement('div');
                                    el.className = 'marker';
                                    el.style.background = spec.Mcolor;
                                    el.style.width = 20+'px';
                                    el.style.height = 20+'px';
                                    el.style.borderRadius = 30+'px';
                                    new mapboxgl.Marker(el)
                                    .setLngLat([term[0],term[1]])
                                    .addTo(to);

                          })

                          if (this.map.getLayer('route')){
                            this.map.removeLayer('route')
                            this.map.removeSource('route');
                          }

                          this.map.addLayer({
                            "id": "route",
                            "type": "line",
                            "source": {
                              "type": "geojson",
                              "data": {
                                 "type": "Feature",
                                 "properties": {},
                                 "geometry": {
                                    "type": "LineString",
                                    "coordinates": tab
                                  }
                              }
                          },
                          "layout": {
                             "line-join": "round",
                             "line-cap": "round"
                           },
                           "paint": {
                             "line-color": spec.Lcolor,
                             "line-width": 5
                           }
                         });

                       }




    getDataViz(){

      var el = document.createElement('div');
      el.className = 'marker';
      el.style.background = spec.Mcolor;
      el.style.width = 20+'px';
      el.style.height = 20+'px';
      el.style.borderRadius = 30+'px';
      new mapboxgl.Marker(el)
      .setLngLat([longi,lati])
      .addTo(this.map);

        if (this.map.getLayer('route')){
          this.map.removeLayer('route')
          this.map.removeSource('route');
        }

        this.map.addLayer({
          "id": "route",
          "type": "line",
          "source": {
            "type": "geojson",
            "data": {
               "type": "Feature",
               "properties": {},
               "geometry": {
                  "type": "LineString",
                  "coordinates":tab
                }
            }
        },
        "layout": {
           "line-join": "round",
           "line-cap": "round"
         },
         "paint": {
           "line-color": spec.Lcolor,
           "line-width": 5
         }
       });
    }



    logout(){
      firebase.auth().signOut().then(function() {
      console.log("signout");
      navigate('/')
     }).catch(function(error) {
       console.log(error)
     });
    }

     render(){

       if (typeof window === `undefined`) { return null; }

       return(
        <div>
        <img className="exitStyleMap" onClick={this.logout.bind(this)} src={Exit} ></img>
        <button className="btn fifth" style={{display:this.state.visible}} onClick={this.handleClick.bind(this)}>Enregistrer votre position</button>
         <div ref="textInput" id='map'></div></div>
       )
     }
   }
