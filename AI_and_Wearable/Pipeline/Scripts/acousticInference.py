import tensorflow as tf
import tensorflow.keras as keras
import numpy as np
print(tf.__version__)
print(keras.__version__)

tf.compat.v1.logging.set_verbosity(tf.compat.v1.logging.ERROR)

def load(path):
    global model
    model = keras.models.load_model(path)
    return model

def predictOutcome(model, imagePath):
    img = keras.preprocessing.image.load_img(
            imagePath, target_size=(314, 235)
        )
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    predictions = model.predict(img_array)
    score = tf.nn.softmax(predictions[0])
    labeled = {'Crowd Convo.': score[0], 'Large Convo': score[1], 'Noise': score[2], 'Quiet': score[3],
               'Small Convo.': score[4], 'Stimuli': score[5], 'Unknown': score[6], 'Wind': score[7]}
    print(labeled)
    return np.argmax(score)
