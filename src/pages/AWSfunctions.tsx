import * as AWS from 'aws-sdk'
import { DataRow } from '../components/Menu';

const tableName = process.env.TABLE_NAME || '';

const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2',
    secretAccessKey: 'f/ctxi9O3nXp1VKxKKPouGN3LrPdJF6fH7m2+1aN',
    accessKeyId: 'AKIAYYRPTQEFSPKF75ME'
})

// export const createResponse = (body: string | AWS.DynamoDB.DocumentClient.ItemList, statusCode = 200) => {
//     return {
//       statusCode,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,DELETE',
//       },
//       body: JSON.stringify(body, null, 2),
//     };
//   };
  
// export const getUsernames = async () => {
//     const scanResult = await docClient.scan({ TableName: tableName }).promise();
//     return scanResult;
//   };

//   exports.handler = async function (event: AWSLambda.APIGatewayEvent) {
//     try {
//       const { httpMethod, body: requestBody } = event;
  
//       if (httpMethod === 'GET') {
//         const response = await getUsernames();
//         return createResponse(response.Items || []);
//       }
  
//       if (!requestBody) {
//         return createResponse('Missing request body', 500);
//       }
  
//       const data = JSON.parse(requestBody);
  
//     //   if (httpMethod === 'POST') {
//     //     const dragon = await addDragonItem(data);
//     //     return dragon
//     //       ? createResponse(`${JSON.stringify(data)} added to the database`)
//     //       : createResponse('Dragon is missing', 500);
//     //   }
  
//     //   if (httpMethod === 'DELETE') {
//     //     const dragon = await deleteDragonItem(data);
//     //     return dragon
//     //       ? createResponse(`${JSON.stringify(data)} deleted from the database`)
//     //       : createResponse('Dragon is missing', 500);
//     //   }
  
//       return createResponse('Ops, something wrong!', 500);
//     } catch (error) {
//       console.log(error);
//       return createResponse('Handeler failed', 500);
//     }
//   };

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
            // console.log("Success", data);
            // data.Items?.forEach(function(element, index, array) {
            //     console.log(
            //         "printing",
            //         element.Title + " (" + element.Subtitle.S + ")"
            //     )
            // })
            console.log(data)
            return data
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
