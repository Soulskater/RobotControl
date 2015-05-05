#!/usr/bin/python
from Adafruit_I2C import Adafruit_I2C
import sys


class Adafruit_LSM303(Adafruit_I2C):

    #LSM303_ADDRESS_ACCEL = (0x32 >> 1)  # 0011001x
    LSM303_ADDRESS_MAG   = (0x3C >> 1)  # 0011110x
                                             # Default    Type
    LSM303_REGISTER_MAG_CRB_REG_M     = 0x01
    LSM303_REGISTER_MAG_MR_REG_M      = 0x02
    LSM303_REGISTER_MAG_OUT_X_H_M     = 0x03

    # Gain settings for setMagGain()
    LSM303_MAGGAIN_1_3 = 0x20 # +/- 1.3
    LSM303_MAGGAIN_1_9 = 0x40 # +/- 1.9
    LSM303_MAGGAIN_2_5 = 0x60 # +/- 2.5
    LSM303_MAGGAIN_4_0 = 0x80 # +/- 4.0
    LSM303_MAGGAIN_4_7 = 0xA0 # +/- 4.7
    LSM303_MAGGAIN_5_6 = 0xC0 # +/- 5.6
    LSM303_MAGGAIN_8_1 = 0xE0 # +/- 8.1


    def __init__(self, busnum=-1, debug=False, hires=False):

        # Accelerometer and magnetometer are at different I2C
        # addresses, so invoke a separate I2C instance for each
        self.mag   = Adafruit_I2C(self.LSM303_ADDRESS_MAG  , busnum, debug)

        # Enable the magnetometer
        self.mag.write8(self.LSM303_REGISTER_MAG_MR_REG_M, 0x00)

    # Interpret signed 16-bit magnetometer component from list
    def mag16(self, list, idx):
        n = (list[idx] << 8) | list[idx+1]   # High, low bytes
        return n if n < 32768 else n - 65536 # 2's complement signed


    def read(self):
        # Read the magnetometer
        list = self.mag.readList(self.LSM303_REGISTER_MAG_OUT_X_H_M, 6)
        res = [self.mag16(list, 0),
                    self.mag16(list, 2),
                    self.mag16(list, 4),
                    0.0 ] # ToDo: Calculate orientation

        return res


    def setMagGain(self, gain=LSM303_MAGGAIN_1_3):
        self.mag.write8(self.LSM303_REGISTER_MAG_CRB_REG_M, gain)


#if __name__ == '__main__':

lsm = Adafruit_LSM303()
lsm.setMagGain()
print lsm.read()
