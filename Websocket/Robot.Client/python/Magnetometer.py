#!/usr/bin/python
from Adafruit_I2C import Adafruit_I2C
import sys
import math


class Magnetometer(Adafruit_I2C):
    LSM303_ADDRESS_MAG = (0x3C >> 1)  # 0011110x

    LSM303_REGISTER_MAG_CRB_REG_M = 0x01
    LSM303_REGISTER_MAG_MR_REG_M = 0x02
    LSM303_REGISTER_MAG_OUT_X_H_M = 0x03

    # Gain settings for setMagGain()
    LSM303_MAGGAIN_1_3 = 0x20  # +/- 1.3
    LSM303_MAGGAIN_1_9 = 0x40  # +/- 1.9
    LSM303_MAGGAIN_2_5 = 0x60  # +/- 2.5
    LSM303_MAGGAIN_4_0 = 0x80  # +/- 4.0
    LSM303_MAGGAIN_4_7 = 0xA0  # +/- 4.7
    LSM303_MAGGAIN_5_6 = 0xC0  # +/- 5.6
    LSM303_MAGGAIN_8_1 = 0xE0  # +/- 8.1

    SENSORS_MAGFIELD_EARTH_MAX = 60.0
    SENSORS_MAGFIELD_EARTH_MIN = 30.0
    LSM303_Mag_Gauss_LSB_XY = 1100.0
    LSM303_Mag_Gauss_LSB_Z = 980.0
    SENSORS_GAUSS_TO_MICROTESLA = 100

    def __init__(self, busnum=-1, debug=False):

        # Accelerometer and magnetometer are at different I2C
        # addresses, so invoke a separate I2C instance for each
        self.mag = Adafruit_I2C(self.LSM303_ADDRESS_MAG, busnum, debug)
        self._magGain = self.LSM303_MAGGAIN_1_3
        self.setMagGain(self._magGain)

        # Enable the magnetometer
        self.mag.write8(self.LSM303_REGISTER_MAG_MR_REG_M, 0x00)

    def mag16(self, list, idx):
        hi = list[idx]
        low = list[idx + 1]
        n = ((hi & 0xFF) << 8) | (low & 0xFF) # High, low bytes
        return n if n < 32768 else n - 65536

    def read(self):
        magData = self.mag.readList(self.LSM303_REGISTER_MAG_OUT_X_H_M, 6)
        magX = self.mag16(magData, 0)
        magY = self.mag16(magData, 2)
        magZ = self.mag16(magData, 4)
        res = [magX,  # / self.LSM303_Mag_Gauss_LSB_XY * self.SENSORS_GAUSS_TO_MICROTESLA,
               magY,  # / self.LSM303_Mag_Gauss_LSB_XY * self.SENSORS_GAUSS_TO_MICROTESLA,
               magZ]  # / self.LSM303_Mag_Gauss_LSB_Z * self.SENSORS_GAUSS_TO_MICROTESLA]
        return res

    def setMagGain(self, gain=LSM303_MAGGAIN_1_3):
        self.mag.write8(self.LSM303_REGISTER_MAG_CRB_REG_M, gain)
        self._magGain = gain

        if gain == self.LSM303_MAGGAIN_1_3:
            self.LSM303_Mag_Gauss_LSB_XY = 1100
            self.LSM303_Mag_Gauss_LSB_Z = 980
        elif gain == self.LSM303_MAGGAIN_1_9:
            self.LSM303_Mag_Gauss_LSB_XY = 855
            self.LSM303_Mag_Gauss_LSB_Z = 760
        elif gain == self.LSM303_MAGGAIN_2_5:
            self.LSM303_Mag_Gauss_LSB_XY = 670
            self.LSM303_Mag_Gauss_LSB_Z = 600
        elif gain == self.LSM303_MAGGAIN_4_0:
            self.LSM303_Mag_Gauss_LSB_XY = 450
            self.LSM303_Mag_Gauss_LSB_Z = 400
        elif gain == self.LSM303_MAGGAIN_4_7:
            self.LSM303_Mag_Gauss_LSB_XY = 400
            self.LSM303_Mag_Gauss_LSB_Z = 355
        elif gain == self.LSM303_MAGGAIN_5_6:
            self.LSM303_Mag_Gauss_LSB_XY = 330
            self.LSM303_Mag_Gauss_LSB_Z = 295
        elif gain == self.LSM303_MAGGAIN_8_1:
            self.LSM303_Mag_Gauss_LSB_XY = 230
            self.LSM303_Mag_Gauss_LSB_Z = 205
