#!/bin/bash

echo "Starting data collection. Standby"

/bin/bash /home/pi/ECEN404/Sensors/Scripts/dataCollection.sh

echo "Starting data inference. Standby"

/bin/bash /home/pi/ECEN404/Pipeline/Scripts/dataInference.sh

echo "Done."
