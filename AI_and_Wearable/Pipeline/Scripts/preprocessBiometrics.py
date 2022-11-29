# Constants
MAX_HR = 200.1
MAX_DIF = 28.0

def extractData():
    with open("/home/pi/ECEN404/Sensors/Data/hr_base10.txt") as file:
        lines = file.readlines()
        lines = [int(line.rstrip()) for line in lines]
    return lines

def averageData(data):
    return sum(data)/len(data)

def differentialData(data):
    if (data[len(data)-1]-data[0]) < 0:
        return 0
    
    return abs(data[len(data)-1]-data[0])

def minMaxScaleAverage(data):
    return data/MAX_HR

def minMaxScaleDifferential(data):
    return data/MAX_DIF
