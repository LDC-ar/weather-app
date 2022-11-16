const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for Express config.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // Set the new path for the views folder.
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Express config:
//
// Setup static directory to serve.
app.use(express.static(publicDirectoryPath));

// Routes:
//
// We use the render method to pass the files HBS needs to render
app.get('', (req, res) => {
	res.render('index', {
		// This way we pass the file and props
		title: 'Weather',
		name: 'Leandro Castagno',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Leandro Castagno',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Leandro Castagno',
		message: 'Contact me if you need any help 👍',
	});
});

app.get('/weather', (req, res) => {
	const address = req.query.address;

	if (!address) {
		return res.send({ error: 'You must provide an address to search' });
	} else {
		geocode(address, (error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}
			forecast(latitude, longitude, (error, { dataForecast, isDay }) => {
				if (error) {
					return res.send({ error });
				}
				res.json({
					forecast: dataForecast,
					location,
					address,
					isDay,
				});
			});
		});
	}
});

// 404 Routes
//
app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Help',
		name: 'Leandro Castagno',
		errorMessage: 'Help article not found',
	});
});

// Next code is for 404 page. It goes last in the routes list because otherwise it will look for this page before others.
app.get('*', (req, res) => {
	res.render('404', {
		title: 'Help',
		name: 'Leandro Castagno',
		errorMessage: 'Page not found',
	});
});

// This way we just pass the file.
// app.get('/help', (req, res) => {
//  	res.render('help');
// });

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
