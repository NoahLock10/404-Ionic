import numpy as np

def encode(category):
    arr = np.zeros((8,), dtype=int)
    arr[category] = 1
    return arr
