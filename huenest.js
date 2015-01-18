var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var host = "192.168.0.3",
    username = "dd327583e65793f341108109d794f",
    api = new HueApi(host, username),
    state;


var nest = require('nest-thermostat').init('jamesferguson@me.com', 'sccqkdvf');


function yourFunction(){
    nest.getInfo('02AA01AC211405U9', function(data) {
        console.log('Currently ' + data.current_temperature + ' degrees celsius');
        console.log('Target is ' + data.target_temperature + ' degrees celsius');

        if (data.current_temperature == data.target_temperature) {
            // Set light state to 'on' with warm white value of 500 and brightness set to 100%
            state = lightState.create().on().white(300, 100);

            // --------------------------
            // Using a promise
            api.setLightState(1, state)
                .then(displayResult)
                .done();
        }
    });
    setTimeout(yourFunction, 60000);
}

yourFunction();



