import './home.css';
import { GoogleMap } from '@capacitor/google-maps';
import { useRef, useState, useEffect } from 'react';
import { fetchData } from './AWSfunctions';
import { DataRow } from '../components/Menu';

const Home: React.FC = () => {
    const mapRef = useRef<HTMLElement>();
    const apiEndpoint = './ApiConnection.tsx';
    let newMap: GoogleMap;
    //const [data, setData] = useState<Array<DataRow>>([]);

    const fetchDataFormDynamoDb = () => {
      fetchData('Team12TestDyno')
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
          zoom: 8
        }
      })
    }

    return(
        <>
        <div className="home">
            <div className="title">
                {/* Title on top of page */}
                <h1><b>The 12th Man</b></h1>
            </div>
            <div>
              <p>Fetch data: {fetchDataFormDynamoDb}</p>
              <button onClick={() => fetchDataFormDynamoDb()}> Fetch </button>
            </div>
            <div className="map">
                <capacitor-google-map ref={mapRef} style={{
                    display: 'inline-block', 
                    width: 275,
                    height: 400
                }}>
                </capacitor-google-map>
                {/* <button onClick={() => createMap()}> Create Map </button> */}
            </div>
            <div className="status">
                <h1><b>Status:</b></h1>
                <h1><b>Stable</b></h1>
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