import RPi.GPIO as io
import time
import sys
from motor import Motor

io.setmode(io.BOARD)

# motors
motor1 = Motor(11, 7, 21)
motor2 = Motor(15, 13, 19)
motor3 = Motor(29, 31, 23)
motor4 = Motor(35, 33, 37)

if len(sys.argv) <= 1:
    print "No arguments"

direction = sys.argv[1]
speed = 100 #float(sys.argv[2])

try:
    if direction == "forward":
        motor1.changeDirection(True)
        motor2.changeDirection(True)
        motor3.changeDirection(True)
        motor4.changeDirection(True)
    if direction == "backward":
        motor1.changeDirection(False)
        motor2.changeDirection(False)
        motor3.changeDirection(False)
        motor4.changeDirection(False)
    if direction == "left":
        motor1.changeDirection(True)
        motor2.changeDirection(True)
        motor3.changeDirection(False)
        motor4.changeDirection(False)
    if direction == "right":
        motor1.changeDirection(False)
        motor2.changeDirection(False)
        motor3.changeDirection(True)
        motor4.changeDirection(True)
    if direction == "none":
        motor1.changeSpeed(0)
        motor2.changeSpeed(0)
        motor3.changeSpeed(0)
        motor4.changeSpeed(0)
    else:
        motor1.changeSpeed(speed)
        motor2.changeSpeed(speed)
        motor3.changeSpeed(speed)
        motor4.changeSpeed(speed)
    while True:
        time.sleep(0.02)

except KeyboardInterrupt:
    pass
motor1.stopPins()
io.cleanup()