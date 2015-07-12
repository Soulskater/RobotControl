from Adafruit_I2C import Adafruit_I2C


class Gyro(Adafruit_I2C):

    L3GD20_ADDRESS = 0x6B  # 1101011
    L3GD20_REGISTER_CTRL_REG1 = 0x20
    L3GD20_REGISTER_CTRL_REG4 = 0x23
    L3GD20_REGISTER_OUT_X_L = 0x28
    L3GD20_SENSITIVITY_250DPS = 0.00875  # Roughly 22/256 for fixed point match
    L3GD20_SENSITIVITY_500DPS = 0.0175  # Roughly 45/256
    L3GD20_SENSITIVITY_2000DPS = 0.070  # Roughly 18/256
    L3GD20_DPS_TO_RADS = 0.017453293

    def __init__(self, busnum=-1, debug=False):

        self.gyro = Adafruit_I2C(self.L3GD20_ADDRESS, busnum, debug)
        self.gyro.write8(self.L3GD20_REGISTER_CTRL_REG1, 0x0F)

        self.gyro.write8(self.L3GD20_REGISTER_CTRL_REG4, 0x00)  # 250DPS range

    def gyro16(self, list, idx):
        n = (list[idx] | (list[idx+1] << 8))
        if n > 32767:
            n -= 65536
        return n

    def read(self):
        list = self.gyro.readList(self.L3GD20_REGISTER_OUT_X_L | 0x80, 6)
        res = [self.gyro16(list, 0) * self.L3GD20_SENSITIVITY_250DPS,
               self.gyro16(list, 2) * self.L3GD20_SENSITIVITY_250DPS,
               self.gyro16(list, 4) * self.L3GD20_SENSITIVITY_250DPS]
        return res

lsm = Gyro()
print lsm.read()