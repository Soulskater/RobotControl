#!/usr/bin/python
from Adafruit_I2C import Adafruit_I2C


class Accelerometer(Adafruit_I2C):

    # Minimal constants carried over from Arduino library
    LSM303_ADDRESS_ACCEL = (0x32 >> 1)  # 0011001x

    LSM303_REGISTER_ACCEL_CTRL_REG1_A = 0x20 # 00000111   rw
    LSM303_REGISTER_ACCEL_CTRL_REG4_A = 0x23 # 00000000   rw
    LSM303_REGISTER_ACCEL_OUT_X_L_A   = 0x28

    SENSORS_GRAVITY_EARTH = 9.80665
    LSM303_ACCEL_MG_LSB = 0.001

    def __init__(self, busnum=-1, debug=False, hires=False):

        # Accelerometer and magnetometer are at different I2C
        # addresses, so invoke a separate I2C instance for each
        self.accel = Adafruit_I2C(self.LSM303_ADDRESS_ACCEL, busnum, debug)

        # Enable the accelerometer
        self.accel.write8(self.LSM303_REGISTER_ACCEL_CTRL_REG1_A, 0x27)
        # self.accel.write8(self.LSM303_REGISTER_ACCEL_CTRL_REG4_A, 0b00001000)
        reg1_a = self.accel.readU8(self.LSM303_REGISTER_ACCEL_CTRL_REG1_A)
        if reg1_a != 0x27:
            print "Accelerometer not connected"

    def accel12(self, list, idx):
        n = (list[idx] | (list[idx+1] << 8))
        if n > 32767:
            n -= 65536
        return n >> 4

    def read(self):
        list = self.accel.readList(self.LSM303_REGISTER_ACCEL_OUT_X_L_A | 0x80, 6)
        res = [self.accel12(list, 0),  # * self.LSM303_ACCEL_MG_LSB * self.SENSORS_GRAVITY_EARTH,
               self.accel12(list, 2),  # * self.LSM303_ACCEL_MG_LSB * self.SENSORS_GRAVITY_EARTH,
               self.accel12(list, 4)]  #* self.LSM303_ACCEL_MG_LSB * self.SENSORS_GRAVITY_EARTH]

        return res