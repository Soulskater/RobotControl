import RPi.GPIO as io


class Motor:
    def __init__(self, pin1, pin2):
        self.pin1 = pin1
        self.pin2 = pin2
        self.clockwise = False
        io.setup(pin1, io.OUT)
        io.setup(pin2, io.OUT)
        self.pin1PWM = io.PWM(pin1, 50)
        self.pin2PWM = io.PWM(pin2, 50)
        self.pin1PWM.start(0)
        self.pin2PWM.start(0)

    def changeDirection(self, clockwise):
        self.clockwise = clockwise

    def changeSpeed(self, speed):
        if self.clockwise:
            self.pin1PWM.ChangeDutyCycle(0)
            self.pin2PWM.ChangeDutyCycle(speed)
        else:
            self.pin2PWM.ChangeDutyCycle(0)
            self.pin1PWM.ChangeDutyCycle(speed)

    def stopPins(self):
        self.pin1PWM.stop()
        self.pin2PWM.stop()