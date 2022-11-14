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
				$messageOne.textContent = data.location;
				$messageTwo.textContent = data.forecast;
			}
		});
	});
});
console.log('Testing');
