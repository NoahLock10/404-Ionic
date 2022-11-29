from distutils.command.upload import upload
import logging
import boto3
from botocore.exceptions import ClientError
import os
from datetime import datetime
import argparse

def upload_data(heart_rate, coordinates, ambi_temp, accelerometer_tuple):
    """ Upload data collected by RPi to DynamoDB table
    :param heart_rate: BPM
    :param coordinates: lat. and long. tuple
    :param ambi_temp: Degrees in Farenheit
    :param accelerometer_tuple: acceleration in (x,y,z) direction
    :return: True if item successfully updated, False else
    """
    # Get the service resource
    dynamodb_client = boto3.client('dynamodb', region_name='us-east-2')
    
    # Add most recent data collected to table
    response = dynamodb_client.put_item(
        TableName='jaskrosl-dev-table',
        Item={
            'Timestamp': { 'S':str(datetime.now())},
            'heart_rate': {'S': heart_rate},
            'coordinates': {'S': coordinates},
            'ambi_temp': {'S': ambi_temp},
            'accelerometer': {'S': accelerometer_tuple},
        }
    )

    print(response)
    return True

upload_data('100', '0.0 N 0.0 W', '99', '(1,1,1)')

    

