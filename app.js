const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.options({
  a:{
    demand:true,
    alias:'address',
    describe: 'fetch weather for adress',
    string:true
  }
})

.help()
.alias('help','h')
.argv;

console.log(argv);

geocode.geocodeAddress(argv.address,(errorMessage,results) => {
  if(errorMessage){
    console.log(errorMessage);
  }else{
    console.log(results.address);
    weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResult) => {
  if(errorMessage)
  {
    console.log(errorMessage);
  }
  else{
    console.log(`It is currently ${weatherResult.temperature} Fahrenheit and it feels like ${weatherResult.apparentTemperature} Fahrenheit`);
  }
});
}
});
