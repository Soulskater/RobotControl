var enumObject = {
    command: "command",
    orientation: "orientation",
    distance: "distance",
    hasTopic: function (topic) {
        return enumObject[topic] !== undefined;
    }
};
module.exports = enumObject;
