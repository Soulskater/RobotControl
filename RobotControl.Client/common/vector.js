var vector = function (x, y, z) {

    var self = {
        x: x,
        y: y,
        z: z,

        cross: function (vectorB) {
            var x = (self.y * vectorB.z) - (self.z * vectorB.y);
            var y = (self.z * vectorB.x) - (self.x * vectorB.z);
            var z = (self.x * vectorB.y) - (self.y * vectorB.x);
            return vector(x, y, z);
        },
        dot: function (vectorB) {
            return (self.x * vectorB.x) + (self.y * vectorB.y) + (self.z * vectorB.z);
        },
        magnitude: function () {
            return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
        },
        normalize: function () {
            var magnitude = self.magnitude();
            var x = self.x / magnitude;
            var y = self.y / magnitude;
            var z = self.z / magnitude;
            return vector(x, y, z);
        },
        clone: function () {
            return vector(self.x, self.y, self.z);
        }
    };

    return self;
};

module.exports = vector;