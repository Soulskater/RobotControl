import RPi.GPIO as io


class Motor:
    def __init__(self, pin1, pin2, pin3):
        self.motorPin1 = pin1
        self.motorPin2 = pin2
        self.enablePin = pin3
        self.clockwise = False
        io.setup(pin1, io.OUT)
        io.setup(pin2, io.OUT)
        io.setup(pin3, io.OUT)
        self.pin3PWM = io.PWM(pin3, 60)
        self.pin3PWM.start(0)

    def changeDirection(self, clockwise):
        self.clockwise = clockwise

    def forward(self, speed):
        io.output(self.motorPin1, False)
        io.output(self.motorPin2, True)
        self.pin3PWM.ChangeDutyCycle(speed)

    def backward(self, speed):
        io.output(self.motorPin1, True)
        io.output(self.motorPin2, False)
        self.pin3PWM.ChangeDutyCycle(speed)

    def stop(self):
        io.output(self.motorPin1, False)
        io.output(self.motorPin2, False)
        self.pin3PWM.ChangeDutyCycle(0)

    def stopPins(self):
        io.output(self.motorPin1, False)
        io.output(self.motorPin2, False)
        self.pin3PWM.stop()