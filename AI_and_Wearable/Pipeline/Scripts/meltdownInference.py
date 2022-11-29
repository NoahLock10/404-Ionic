import tensorflow as tf
import tensorflow.keras as keras
import numpy as np

tf.compat.v1.logging.set_verbosity(tf.compat.v1.logging.ERROR)

def load(path):
    global model
    model = keras.models.load_model(path)
    return model

def predictOutcome(model, dataPoint):
    prediction = model.predict(dataPoint)
    return prediction[0][0]

#filePath = 'model_data/'
#model = keras.models.load_model(filePath)

#sample_input = np.array([[87.5/200.1, 18/28, 1, 0, 0, 0, 0, 0, 0, 0],])
#likelihood = predictOutcome(model, sample_input)

#print(likelihood)
