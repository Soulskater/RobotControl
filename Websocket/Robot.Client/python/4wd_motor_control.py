import RPi.GPIO as io
import time
import sys
from motor import Motor

io.setmode(io.BOARD)

# motors
motor1 = Motor(7, 11, 13)

if len(sys.argv) <= 1:
    print "No arguments"

direction = sys.argv[1]
speed = float(sys.argv[2])

try:
    if direction == "cw":
        motor1.changeDirection(True)
    if direction == "ccw":
        motor1.changeDirection(False)
    motor1.changeSpeed(speed)
    while True:
        time.sleep(0.02)

except KeyboardInterrupt:
    pass
motor1.stopPins()
io.cleanup()