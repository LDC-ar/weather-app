const request = require('request');

const weatherApi = '23be8d65f2b8cfef934cf5952db357ee';

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${weatherApi}&query=${latitude},${longitude}`;

	request({ url, json: true }, (error, response) => {
		const { weather_descriptions, temperature } = response.body.current;

		if (error) {
			callback('Unable to connect to Weather API', undefined);
		} else if (response.body.error) {
			callback('Unable to find weather, search for another.', undefined);
		} else {
			callback(undefined, `It is currently ${weather_descriptions}, with a temperature of ${temperature}°C`);
		}
	});
};

module.exports = forecast;
