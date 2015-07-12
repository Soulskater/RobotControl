#!/usr/bin/python
import time
import RPi.GPIO as GPIO

def measure():
 GPIO.output(GPIO_TRIGGER, True)
 time.sleep(0.00001)
 GPIO.output(GPIO_TRIGGER, False)
 start = time.time()

 while GPIO.input(GPIO_ECHO)==0:
   start = time.time()

 while GPIO.input(GPIO_ECHO)==1:
   stop = time.time()

 elapsed = stop-start
 distance = (elapsed * 34300)/2

 return distance

def measure_average():
 distance1=measure()
 time.sleep(0.1)
 distance2=measure()
 time.sleep(0.1)
 distance3=measure()
 distance = distance1 + distance2 + distance3
 distance = distance / 3
 return distance

GPIO.setmode(GPIO.BCM)

GPIO_TRIGGER = 23
GPIO_ECHO    = 24

# Set pins as output and input
GPIO.setup(GPIO_TRIGGER,GPIO.OUT)  # Trigger
GPIO.setup(GPIO_ECHO,GPIO.IN)      # Echo

# Set trigger to False (Low)
GPIO.output(GPIO_TRIGGER, False)

print measure_average()
GPIO.cleanup()
