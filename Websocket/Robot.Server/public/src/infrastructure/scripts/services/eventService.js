angular.module("RobotControl").service("eventService", function ($rootScope) {
    return {
        emitter: _Emitter
    };

    function _Emitter() {
        var self = this;
        var _emitter = new EventEmitter();

        self.addListener = function (event, handler) {
            _emitter.addListener(event, function (data) {
                handler.apply(this, arguments);
                $rootScope.$digest();
                $rootScope.$apply();
            })
        };

        self.emitEvent = function (event, data) {
            _emitter.emitEvent.apply(_emitter, arguments);
        }
    }
});