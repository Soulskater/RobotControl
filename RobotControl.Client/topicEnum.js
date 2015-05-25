var enumObject = {
    command: "command",
    orientation: "orientation",
    hasTopic: function (topic) {
        return enumObject[topic] !== undefined;
    }
};
module.exports = enumObject;
