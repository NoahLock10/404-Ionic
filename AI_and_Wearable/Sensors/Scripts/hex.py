import os
filepath = '/home/pi/ECEN404/Sensors/Data/hr_hex.txt'

if os.stat(filepath).st_size > 0:

    f_read = open("/home/pi/ECEN404/Sensors/Data/hr_hex.txt", "r")
    f_write = open("/home/pi/ECEN404/Sensors/Data/hr_base10.txt", "w")
    
    for line in f_read:
        line = line.strip()
        if line:
            val = str(int(line,16)) + "\n"
            f_write.write(val)

    f_read.close()
    f_write.close()
