import tensorflow as tf
import tensorflow.keras as keras
import numpy as np
print(tf.__version__)
print(keras.__version__)

def load(path):
    global model
    model = keras.models.load_model(path)
    return model

def predictOutcome(model, dataPoint):
    prediction = model.predict(dataPoint)
    return prediction

filePath = 'model_data/'
model = keras.models.load_model(filePath)

sample_input = np.array([[87.5/200.1, 18/28, 1, 0, 0, 0, 0, 0, 0, 0],])
likelihood = predictOutcome(model, sample_input)

print(likelihood)
