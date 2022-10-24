import './home.css';
import { GoogleMap } from '@capacitor/google-maps'; //@capacitor-community/capacitor-googlemaps-native   @capacitor/google-maps
import { useRef, useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNodeArray, ReactPortal} from 'react';
import { fetchData } from './AWSfunctions';
import { UserData } from '../components/Menu';
import { IonInput } from '@ionic/react';
import { stringList } from 'aws-sdk/clients/datapipeline';
import { getTableData } from './AWSfunctions';
import { Json } from 'aws-sdk/clients/robomaker';
import { someID } from './loginPersonal';


/*pass varable and rerender to get variable
re render very x(60-120) second to pull the most accurate data
notification for meltdown
*/

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
    const names = []

    useEffect(() => {
      console.log('use effect is triggered.')
      users = getTableData();
      console.log(users);
      console.log("User ID: ", someID);
      users.then(data => setUserData(data));
      createMap();
    }, []) //adding the [] causes the useEffect to run once, else it will continue to run

    let fetchDataFormDynamoDb = async () => {
      users = getTableData();
      //console.log(users);
      users.then(f => console.log(f));
      users.then(f => setUserData(f));
    }

    // async function displayUsernames(){
    //   return fetchDataFormDynamoDb[Symbol].Array.Username;
    // }
  
    // function to call Google API to show user location
    async function createMap() {
      if (!mapRef.current) return;
      
      var latUse = 30.601389;
      var longUse = -96.314445;

      for(let i=0; i<userData.length; i++){
        if(userData[i].id == 'jason_v0'){
          console.log("Coordinates changed")
          latUse = parseFloat(userData[i].latitude);
          longUse = parseFloat(userData[i].longitude);
        }
      }
  
      newMap = await GoogleMap.create({
        id: 'my-cool-map',
        element: mapRef.current,
        apiKey: 'AIzaSyC08mZyYhKYGM8wJN-9O3eCKGDo4T9V63s',
        config: {
          center: {
            lat: latUse,
            lng: longUse
          },
          zoom: 14
        }
      });
      newMap.addMarker({
        coordinate:{
          lat: latUse,
          lng: longUse,
        }
      });
    }

    return(
        <>
        <div className="home">
            <div className='username'>
              <h1>User ID: {someID}</h1>
            </div>
            <div className="title">
                {/* Title on top of page */}
                <h1><b>The 12th Man</b></h1>
            </div>
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
                  if(us.id == 'jason_v0'){  
                  return (          
                    <div key={us.id}>            
                    <h2>Temperature: {Math.round(parseFloat(us.temperature))}F</h2>                       
                    <hr/>
                    <h2>Heart Rate: {Math.round(parseFloat(us.heart_rate))} BPM</h2>
                    <hr/>
                    <h2>Prediction: {us.prediction}</h2>
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