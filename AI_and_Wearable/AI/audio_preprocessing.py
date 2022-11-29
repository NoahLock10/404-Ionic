import matplotlib.pyplot as plt
import librosa
import librosa.display
import numpy as np
from PIL import Image
from pathlib import Path
from pydub import AudioSegment

def makeMelSpec(fileName):
    filePath = "melspec_files/" + fileName + ".png"
    myFile = Path(filePath)
    
    y, sr = librosa.load("../Sensors/Data/test1.wav")
    whale_song, _ = librosa.effects.trim(y)
    n_fft = 2048
    hop_length = 100
    D = np.abs(librosa.stft(whale_song, n_fft=n_fft, hop_length=hop_length + 1))
    DB = librosa.amplitude_to_db(D, ref=np.max)
    librosa.display.specshow(DB , sr=sr, hop_length=hop_length)
    plt.gca().set_axis_off()
    plt.subplots_adjust(top=1, bottom=0, right=1, left=0, hspace=0, wspace=0)
    plt.margins(0,0)
    plt.gca().xaxis.set_major_locator(plt.NullLocator())
    plt.gca().yaxis.set_major_locator(plt.NullLocator())
    plt.savefig(filePath, bbox_inches='tight', pad_inches=0)
    plt.close()
    
def cutSong(song, st, en, count, fileName, type, path):
    extract = song[st:en]
    print(path + fileName + str(count) + "WAV.....")
    extract.export(path + fileName + str(count) + type, format="wav")
    return extract

def cutAll(filePath, fileName, type):
    song = AudioSegment.from_wav(filePath + fileName)
    secs = song.duration_seconds
    samples = secs / 1.5
    samples = round(samples)
    if (samples >= 1):
        for i in range(samples - 1):
            d = i * 1.5
            startMin = 0
            startSec = d
            endMin = 0
            endSec = d + 1.5
            startTime = startMin * 60 * 1000 + startSec * 1000
            endTime = endMin * 60 * 1000 + endSec * 1000
            name = fileName.replace(type, "")
            try:
                cutSong(song, startTime, endTime, i, name.replace(".WAV", ""), type, "../Sensors/Data/") 
                makeMelSpec(name.replace(".WAV", "") + str(i))
            except Exception as error:
                print(error)

cutAll("../Sensors/Data/", "test1.wav", ".WAV")
