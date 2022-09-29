import * as AWS from 'aws-sdk'
import { UserData } from '../components/Menu';

const tableName = process.env.TABLE_NAME || '';

const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2',
    secretAccessKey: 'f/ctxi9O3nXp1VKxKKPouGN3LrPdJF6fH7m2+1aN',
    accessKeyId: 'AKIAYYRPTQEFSPKF75ME'
});

export async function getTableData() {
    let response = await fetch('https://apyo54kvla.execute-api.us-east-2.amazonaws.com/beta/items',{
        //https://h80iqpndxg.execute-api.us-east-2.amazonaws.com/default
        //https://apyo54kvla.execute-api.us-east-2.amazonaws.com/beta/items
        method: 'GET'
    });
    const myJson = await response.json(); //extract JSON from the http response
    //console.log(myJson.Items);
    return myJson.Items;
}

export const testExport = () => {
    return 'Test Data'
}

export const fetchData = (tableName: any) => {
    var params = {
        TableName: tableName,
        // IndexName: 'Username'
    }

    docClient.scan(params, function (err, data) {
        if (err) {
            console.log('Error', err)
        }
        else if (!err) {
            //console.log(data) //.Items?.[0].Username
            //return "Test0"//data.Items?.[0].Username
            return data.Items?.[0].Username
        }
    })

    // exports.getCoords = async (_req: any, _res: any) => {
    //     const globalLocation = { 
    //       lat: null,
    //       lng: null,
    //     };
    //     const result = await query("SELECT Username FROM GPSCoordinates LIMIT 1");
    //     console.log(result);
    //     globalLocation.lat = result[0].Latidude;
    //     globalLocation.lng = result[0].Longitude;
    //     await _res.json(globalLocation); //responce sent as a json
    //   }
}

function query(arg0: string) {
    throw new Error('Function not implemented.')
}
