import './home.css';
import { GoogleMap } from '@capacitor/google-maps'; //@capacitor-community/capacitor-googlemaps-native   @capacitor/google-maps
import { useRef, useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNodeArray, ReactPortal} from 'react';
import { fetchData } from './AWSfunctions';
import { UserData } from '../components/Menu';
import { IonInput } from '@ionic/react';
import { stringList } from 'aws-sdk/clients/datapipeline';
import { testExport } from './AWSfunctions';
import { getTableData } from './AWSfunctions';
import { Json } from 'aws-sdk/clients/robomaker';


const Home: React.FC = () => {
    const mapRef = useRef<HTMLElement>();
    const apiEndpoint = './ApiConnection.tsx';
    let newMap: GoogleMap;
    let testdata : Json;
    let testString : string = '';
    let users : Promise<any>;

    interface ApiData {
      UserID: number;
      HeartRate: number;
      Temperature: number;
      Username: string;
    } 

    const [userData, setUserData] = useState<ApiData[]>([]);
    const names = []

    useEffect(() => {
      console.log('use effect is triggered.')
      users = getTableData();
      console.log(users);
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
  
      newMap = await GoogleMap.create({
        id: 'my-cool-map',
        element: mapRef.current,
        apiKey: 'AIzaSyC08mZyYhKYGM8wJN-9O3eCKGDo4T9V63s',
        config: {
          center: {
            lat: 30.601389,
            lng: -96.314445
          },
          zoom: 14
        }
      });
      newMap.addMarker({
        coordinate:{
          lat: 30.601389,
          lng: -96.314445,
        }
      });
    }

    return(
        <>
        <div className="home">
            <div className="title">
                {/* Title on top of page */}
                <h1><b>The 12th Man</b></h1>
            </div>
            <div>
              {/* <button onClick={() => fetchDataFormDynamoDb()}> Fetch </button>
              <div>
              <div>      
                { userData.map(us => {        
                    return (          
                      <div key={us.UserID}>            
                      <h2>name: {us.Username}</h2>                       
                      <hr/>          
                      </div>        
                    );      
                  })
                } 
                </div>
              </div> */}
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
                  if(us.UserID == 1){  
                  return (          
                    <div key={us.UserID}>            
                    <h2>Temperature: {us.Temperature}</h2>                       
                    <hr/>
                    <h2>Heart Rate: {us.HeartRate}</h2>        
                    </div>        

                  );
                  }      
                })
              }
            </div>
            <div className="status">
                <h1><b>Status: Stable</b></h1>
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