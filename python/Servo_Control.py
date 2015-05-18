#!/usr/bin/python

from Adafruit_PWM_Servo_Driver import PWM
import time
import sys

def setAllPWM(pulse):
  pwm.setPWM(0,0,pulse)
  pwm.setPWM(1,0,pulse)

if len(sys.argv) <= 1:
  print "No arguments"

servoDirection = sys.argv[1]
# Initialise the PWM device using the default address
# pwm = PWM(0x40)
# Note if you'd like more debug output you can instead run:
pwm = PWM(0x40, debug=True)

servoMin = 150  # Min pulse length out of 4096
servoMax = 850  # Max pulse length out of 4096
pwm.setPWMFreq(60)  # Set frequency to 60 Hz

if servoDirection == "cw":
  setAllPWM(servoMin)
else:
  if servoDirection == "ccw":
    setAllPWM(servoMax)
  else:
    setAllPWM(0)

def setServoPulse(channel, pulse):
  pulseLength = 1000000                   # 1,000,000 us per second
  pulseLength /= 60                       # 60 Hz
  print "%d us per period" % pulseLength
  pulseLength /= 4096                     # 12 bits of resolution
  print "%d us per bit" % pulseLength
  pulse *= 1000
  pulse /= pulseLength
  pwm.setPWM(channel, 0, pulse)



