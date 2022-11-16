const $body = document.querySelector('body');
const $weatherForm = document.querySelector('form');
const $search = document.querySelector('input');
const $messageOne = document.querySelector('#message-1');
const $messageTwo = document.querySelector('#message-2');

const clearMessages = () => {
	$messageOne.textContent = '';
	$messageTwo.textContent = '';
};

$weatherForm.addEventListener('submit', e => {
	e.preventDefault();
	const location = $search.value;
	const url = `/weather?address=${location}`;

	clearMessages();
	$messageOne.textContent = 'Loading...';

	fetch(url).then(response => {
		response.json().then(data => {
			if (data.error) {
				$messageOne.textContent = data.error;
			} else {
				if (data.isDay == 'yes') {
					$body.style.backgroundColor = '#f8d14c';
				} else {
					$body.style.backgroundColor = '#1c1c1c';
				}
				$messageOne.textContent = data.location;
				$messageTwo.textContent = data.forecast;
			}
		});
	});
});
