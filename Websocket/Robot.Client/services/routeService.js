var config = require("../routeConfig");
module.exports = {
    route: function (routeName) {
        switch (routeName) {
            case config.distance.name:
                if (!config.distance.service.processRequest || typeof config.distance.service.processRequest !== "function") {
                    console.error("Service must have processRequest function!");
                    return;
                }
                config.distance.service.processRequest();
                break;
        }
    }
};