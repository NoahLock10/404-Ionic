# Meltdown_Team-12_Fall_2022

The "src" folder holds the code Noah Lockhart wrote to create the app and connect to the database.
The "android" folder holds the code to allow the app to run on android phones.

The "AI and Wearable" folder holds the code Jason and Josh worked on to record the data on the wearable, 
send the data to the database, and make a meltdown prediction using the AI.

Within the "AI and Wearable" folder, the "Sensors" folder has two subdirectories.
"AI and Wearable/Sensors/Scripts" has all the python scripts used for data collection, as well as the shell script which runs them all together.
"AI and Wearable/Sensors/Data" has all the .txt files that are populated via the data collection scripts.

Within the "AI and Wearable" folder, the "AI" folder contains the model weights for the acoustic CNN and the biometric ANN.

Within the "AI and Wearable" folder, the "Database" folder contains the python script to upload data to the DB via the API.

Within the "AI and Wearable" folder, the "Pipeline" folder contains python modules which provide preprocessing functions and inference functions.
Additionally, this folder contains a main.py file which extracts all data collected during data collection, preprocesses it, and makes a prediction.

Within the "AI and Wearable" folder, the "Final" folder contains the shell script which first calls our data collection script, and then calls
the pipeline script. 

All of the presentations and documents created during 403/404 (CONOPS, FSR, ICD, etc.) can be found in the root directory of the GitHub.
All of the solidwords and altium files and validation files can be found in the root directory of the GitHub. 
