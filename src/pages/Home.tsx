import './home.css';
import { GoogleMap } from '@capacitor/google-maps'; //@capacitor-community/capacitor-googlemaps-native   @capacitor/google-maps
import { useRef, useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNodeArray, ReactPortal} from 'react';
import { IonInput } from '@ionic/react';
import { getTableData } from './AWSfunctions';
import { Json } from 'aws-sdk/clients/robomaker';
import { someID } from './loginPersonal';
import emailjs from '@emailjs/browser';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


/*pass varable and rerender to get variable
re render very x(60-120) second to pull the most accurate data
notification for meltdown
*/

const personUserName = someID;
var latat = 30.601389;
var longat = -96.314445;

const Home: React.FC = () => {
    const mapRef = useRef<HTMLElement>();
    const apiEndpoint = './ApiConnection.tsx';
    let newMap: GoogleMap;
    let testdata : Json;
    let testString : string = '';
    let users : Promise<any>;

    interface ApiData {
      //Noah's DB
      // UserID: number;
      // HeartRate: number;
      // Temperature: number;
      // Username: string;
      //Jason's DB
      id: string;
      heart_rate: string;
      latitude: string;
      longitude: string;
      prediction: string;
      temperature: string;
    }

    const [userData, setUserData] = useState<ApiData[]>([]);
    const [meltdown, setMeltdown] = useState(false);
    const [stable, setStable] = useState(true);
    const names = [];

    useEffect(() => {
      // console.log('use effect is triggered.')
      // users = getTableData();
      // console.log(users);
      // console.log("User ID: ", someID);
      // users.then(data => setUserData(data));
      // createMap();
      const interval = setInterval (() => {
        users = getTableData();
        users.then(data => setUserData(data));
        setTimeout(createMap, 5000);
        for(var i=0; i<userData.length; i++){
          if(userData[i].id === (someID + '0') && Math.round(parseFloat(userData[i].prediction))*100 > 90){
            sendEmail();
            setMeltdown(true);
            setStable(false);
          }
          else if(userData[i].id === (someID + '0') && Math.round(parseFloat(userData[i].prediction))*100 < 90){
            setMeltdown(false);
            setStable(true);
          }
        }
        countInter();
      }, 10000);
      return () => clearInterval(interval);
    }, []) //adding the [] causes the useEffect to run once, else it will continue to run

    let inter = 0;

    const sendEmail = () => {
  
      emailjs.send("service_oipgrfz","template_038hpj8",{
        email_to: "noahlock@tamu.edu",
        reply_to: "Test",
        }, "m1pFeVP3TNq7RkCeU")
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
    
    function countInter(){
      inter++;
      console.log("Interval:" + inter)
    }
  
    // function to call Google API to show user location
    async function createMap() {
      if (!mapRef.current) return;
      
      var latUse = 30.601389;
      var longUse = -96.314445;

      console.log(latat);
      console.log(longat);

      // for(var _i=0; _i<10; _i++){
      //   // console.log("Inside Map For loop");
      //   // console.log(userData[_i].id);
      //   if(userData[_i].id === (someID + '_v0')){
      //     console.log("Coordinates changed");
      //     latUse = parseFloat(userData[_i].latitude);
      //     longUse = parseFloat(userData[_i].longitude);
      //   }
      // }
      console.log("Got here in createMap");
  
      newMap = await GoogleMap.create({
        id: 'my-cool-map',
        element: mapRef.current,
        apiKey: 'AIzaSyC08mZyYhKYGM8wJN-9O3eCKGDo4T9V63s',
        config: {
          center: {
            lat: latat,
            lng: longat
          },
          zoom: 14
        }
      });
      newMap.addMarker({
        coordinate:{
          lat: latat,
          lng: longat,
        }
      });
    }

    return(
        <>
        <div className="home">
            <div className='username'>
              <h5>User ID: {someID}</h5>
            </div>
            <div className="title">
                {/* Title on top of page */}
                <h1><b>The 12th Man</b></h1>
            </div>
            {/* <button onClick={() =>sendEmail()}></button> */}
            <div className="map">
                <capacitor-google-map ref={mapRef} style={{
                    display: 'inline-block', 
                    width: 275,
                    height: 300
                }}>
                </capacitor-google-map>
                {/* <button onClick={() => createMap()}> Create Map </button> */}
            </div>
            <div className='dbData'>
              { userData.map(us => {
                  if(us.id ===(someID + '0')){ 
                    latat = parseFloat(us.latitude);
                    longat = parseFloat(us.longitude);
                    console.log ("New Lat: " + latat); 
                  return (          
                    <div key={us.id}>            
                    <h2>Temperature: {Math.round(parseFloat(us.temperature))} &deg;F</h2>                       
                    <hr/>
                    <h2>Heart Rate: {Math.round(parseFloat(us.heart_rate))} BPM</h2>
                    <hr/>
                    {stable ? <><h2 className='prediction'>Prediction: {Math.round(parseFloat(us.prediction)) * 100}%</h2></> : null}
                    {meltdown ? <><h2 className='meltdown'>Prediction: {Math.round(parseFloat(us.prediction)) * 100}%</h2>
                    <hr/><h2 className='meltdown'>MELTDOWN PREDICTED</h2></> : null}
                    </div>
                  );
                  } 
                })
              }
              {/* <h1><b>Stable</b></h1> */}
            </div>
        </div>
        </>
        // <!-- div to display google maps-->
        // <div id="map"></div> 
        // <!-- placeholder for status -->    
        // <div id="status">
        //     <hr id="header-line">
        //     <center>
        //     <h1><b>STATUS:</b></h1>
        //     <h1><b>STABLE</b></h1>
        //     </center>
        // </div>   
    );
};

export default Home;