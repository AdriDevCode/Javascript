// ?Variables

const listTweets = document.getElementById('lista-tweets');
// ?Event listener
eventListener();
// el event listener del tipo submit quiere decir que la funcion se realizara cuando se haga un submit
function eventListener() {
	document
		.querySelector('#formulario')
		.addEventListener('submit', agregartweet);
	// cuando se haga click en borrar
	listTweets.addEventListener('click', borrartweet);
	// *Cuando el contenido de la pagina web haya cargado y poder utilizar el localstorage
	document.addEventListener('DOMContentLoaded', localstoragecargado);
}

// ?functions
// *Agergar el tweet al formulario
function agregartweet(e) {
	e.preventDefault();
	// leer el valor del textarea escrito por el usuario
	const tweet = document.getElementById('tweet').value;

	// *crear elemento li y agregar el contenido escrito por el usuario a la lista
	const li = document.createElement('li');
	// crear el tweet con los valores del text area
	li.innerText = tweet;
	// agregar las listas al padre div
	listTweets.appendChild(li);
	// *crear boton de borrar
	const botonborrar = document.createElement('a');
	botonborrar.classList = 'borrar-tweet';
	botonborrar.innerText = 'X';
	// add el boton como hijo de la lista
	li.appendChild(botonborrar);
	// * Agregar al local storage
	agregartweetlocalstorage(tweet);
}

// *Borrar tweet
function borrartweet(e) {
	e.preventDefault();
	if (e.target.className === 'borrar-tweet') {
		e.target.parentElement.remove();
		borrarTweetLocalStorage(e.target.parentElement.innerText);
	}
}

// *agregar tweet al local storage
function agregartweetlocalstorage(tweet) {
	let tweets;
	tweets = obtenertweetlocalstorage();
	// agregando el nuevo tweet al array
	tweets.push(tweet);
	//  Agregar los elementos al local storage y convertir los elementos del json en strings
	localStorage.setItem('tweets', JSON.stringify(tweets));
}

// comprueba que haya elementos en local storage
function obtenertweetlocalstorage() {
	let tweets;
	// revisamos los valores del local sotage
	if (localStorage.getItem('tweets') === null) {
		tweets = [];
	} else {
		tweets = JSON.parse(localStorage.getItem('tweets'));
	}
	return tweets;
}

// * Agregar los elementos del local storage a la pagina principal
function localstoragecargado() {
	let tweets;
	tweets = obtenertweetlocalstorage();
	tweets.forEach(function (tweet) {
		// *crear elemento li y agregar el contenido escrito por el usuario a la lista
		const li = document.createElement('li');
		// crear el tweet con los valores del text area
		li.innerText = tweet;
		// agregar las listas al padre div listTweets
		listTweets.appendChild(li);
		// *crear boton de borrar
		const botonborrar = document.createElement('a');
		botonborrar.classList = 'borrar-tweet';
		botonborrar.innerText = 'X';
		// add el boton como hijo de la lista
		li.appendChild(botonborrar);
		// * Agregar al local storage
	});
}

// Eliminar tweet de Local Storage

function borrarTweetLocalStorage(tweet) {
	let tweets, tweetBorrar;
	// Elimina la X del tweet
	tweetBorrar = tweet.substring(0, tweet.length - 1);

	tweets = obtenertweetlocalstorage();

	tweets.forEach(function (tweet, index) {
		if (tweetBorrar === tweet) {
			tweets.splice(index, 1);
		}
	});

	localStorage.setItem('tweets', JSON.stringify(tweets));
}

// ?JSON.parse() toma una cadena JSON y la transforma en un objeto de JavaScript ; JSON.stringify() toma un objeto de JavaScript y lo transforma en una cadena JSON.
