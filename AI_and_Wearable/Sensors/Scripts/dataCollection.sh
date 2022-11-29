#!/bin/bash

# Define absolute path variable
PAT="home/pi/ECEN404/Sensors/Scripts/"

# Collect data from accelerometer
python3 /home/pi/ECEN404/Sensors/Scripts/accel.py &

# Collect data from temperature probe
python3 /home/pi/ECEN404/Sensors/Scripts/temp.py &

#gps location
python3 /home/pi/ECEN404/Sensors/Scripts/Location.py &

# Collect data from microphone
python /home/pi/ECEN404/Sensors/Scripts/recorder.py &

# Collect data from heartrate monitor
timeout 30s gatttool -t random -b CB:F4:BB:07:07:B9 --char-write-req --handle=0x0011 --value=0100 --listen | stdbuf -o0 cut -d ' ' -f 7 > /home/pi/ECEN404/Sensors/Data/hr_hex.txt

# Convert heartrates from hex to base10
python3 /home/pi/ECEN404/Sensors/Scripts/hex.py

echo "Data collection complete."

