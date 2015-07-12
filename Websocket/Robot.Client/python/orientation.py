import sys
import math
from Accelerometer import Accelerometer
from Magnetometer import Magnetometer


class Vector():

    def __init__(self, data):
        self.x = data[0]
        self.y = data[1]
        self.z = data[2]


class Orientation():

    def __init__(self):
        self.accel = Accelerometer()
        self.mag = Magnetometer()

    def magTiltCompensation(self, acceleration, magnetic):
        accel_X = acceleration.x
        accel_Y = acceleration.y
        accel_Z = acceleration.z
        mag_X = magnetic.x
        mag_Y = magnetic.y
        mag_Z = magnetic.z

        t_roll = accel_X * accel_X + accel_Z * accel_Z
        rollRadians = math.atan2(accel_Y, math.sqrt(t_roll))

        t_pitch = accel_Y * accel_Y + accel_Z * accel_Z
        pitchRadians = math.atan2(accel_X, math.sqrt(t_pitch))

        cosRoll = math.cos(rollRadians)
        sinRoll = math.sin(rollRadians)
        cosPitch = math.cos(-1*pitchRadians)
        sinPitch = math.sin(-1*pitchRadians)

        mag_X = (mag_X * cosPitch) + (mag_Z * sinPitch)
        mag_Y = (mag_X * sinRoll * sinPitch) + (mag_Y * cosRoll) - (mag_Z * sinRoll * cosPitch)

        return Vector([mag_X, mag_Y, mag_Z])

    def getOrientation(self):
        acceleration = Vector(self.accel.read())
        magnetic = Vector(self.mag.read())
        roll = 0
        pitch = 0
        heading = 0

        PI_F = 3.14159265

        roll = math.atan2(acceleration.x, acceleration.z)

        if acceleration.x * math.sin(roll) + acceleration.z * math.cos(roll) == 0:
            pitch = (PI_F / 2) if acceleration.y > 0 else (-PI_F / 2)
        else:
            pitch = math.atan(-acceleration.y / (acceleration.x * math.sin(roll) + acceleration.z * math.cos(roll)))

        magCompensated = self.magTiltCompensation(acceleration, magnetic)
        heading = math.atan2(magCompensated.x, magCompensated.z)

        return [math.degrees(roll),
                math.degrees(pitch),
                math.degrees(heading)]

orientation = Orientation()
print orientation.getOrientation()
