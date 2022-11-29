def extractLocation():
    with open("/home/pi/ECEN404/Sensors/Data/location.txt") as file:
        data = file.readlines()[1]

    if data:
        data_array = data.split(",")
        return data_array[0], data_array[1]
    else:
        return [30.62,-96.33]

def extractTemperature():
    with open("/home/pi/ECEN404/Sensors/Data/temp.txt") as file:
        lines = file.readlines()
        lines = [float(line.rstrip()) for line in lines]
    return lines
