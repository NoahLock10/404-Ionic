import requests

ENDPOINT = 'https://09480ffay6.execute-api.us-east-2.amazonaws.com/beta/items'

def put_item(identifier, prediction, heart_rate, latitude, longitude, temperature):
    item = {"id": identifier, "prediction": prediction, "heart_rate": heart_rate, "latitude": latitude, "longitude": longitude, "temperature": temperature} 
    response = requests.put(ENDPOINT, json = item)
    return response.status_code

