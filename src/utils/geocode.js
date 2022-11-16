const request = require('request');

const positionApi = '7a6237ff9043060de7c092909c4fea6f';

const geocode = (address, callback) => {
	const url = `http://api.positionstack.com/v1/forward?access_key=${positionApi}&query=${encodeURIComponent(address)}`;

	request({ url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to connect to Position API', undefined);
		} else if (response.body.error) {
			callback('Unable to find location, search for another.', undefined);
		} else {
			callback(undefined, {
				location: response.body.data[0].label,
				latitude: response.body.data[0].latitude,
				longitude: response.body.data[0].longitude,
			});
		}
	});
};

module.exports = geocode;
