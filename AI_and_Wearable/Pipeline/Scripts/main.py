import preprocessBiometrics
import preprocessAudio
import acousticInference
import meltdownInference
import oneHotEncoder
import dbMapper
import extractSensorData

import numpy as np
from pydub import AudioSegment
from pydub.playback import play

if __name__ == '__main__':
    # Extract temperature data and location data
    temperatures = extractSensorData.extractTemperature()
    if len(temperatures) > 0:
        avg_temperature = preprocessBiometrics.averageData(temperatures)
    else:
        avg_temperature = 75

    loc = extractSensorData.extractLocation()

    # Preprocess heart rate data
    heart_rates = preprocessBiometrics.extractData()
    avg = preprocessBiometrics.averageData(heart_rates)
    dif = preprocessBiometrics.differentialData(heart_rates)
    scaledAvg = preprocessBiometrics.minMaxScaleAverage(avg)
    scaledDif = preprocessBiometrics.minMaxScaleDifferential(dif)
    #Debug statement: print(avg, dif, scaledAvg, scaledDif)

    # Preprocess audio data
    preprocessAudio.makeMelSpec("TEST")
    
    # Load acoustic CNN model and make a dummy prediction
    filePath = '/home/pi/ECEN404/AI/saved_model_data/'
    model = acousticInference.load(filePath)
    prediction = acousticInference.predictOutcome(model, '/home/pi/ECEN404/Pipeline/Scripts/melspec_files/' + 'TEST.png')
    oneHot = oneHotEncoder.encode(prediction)
    #Debug statement: print(oneHotEncoder.encode(prediction))
    
    # Concatenate heart rate data with one hot encoded acoustic class
    biometrics = np.array([scaledAvg, scaledDif])
    tensor = np.concatenate((biometrics, oneHot), axis=None)
    #Debug statement: print(tensor)

    # Load meltdown ANN model and make a dummy prediction
    filePath = '/home/pi/ECEN404/AI/model_data/'
    model = meltdownInference.load(filePath)
    prediction = meltdownInference.predictOutcome(model, np.array([tensor],))
    print("Likelihood of meltdown", prediction)

    # Retrieve the unique key for new db entry
    with open("/home/pi/count.txt", 'r') as file:
        count = int(file.readline()) + 1

    with open("/home/pi/count.txt", 'w') as file:
        file.write(str(count))
    
    # Post prediction to database
    try:
        # Update the 0th element - this will always hold the newest data
        dbMapper.put_item("jason_v" + "0", str(prediction), avg, loc[0], loc[1], avg_temperature)
        # Post the ith element - this will also hold the newest data
        dbMapper.put_item("jason_v" + str(count), str(prediction), avg, loc[0], loc[1], avg_temperature)
    except:
        print("An error occurred: Failed to post to db")

    if (prediction > .7):
        song = AudioSegment.from_file("/home/pi/groundingExercise.m4a")
        play(song)

