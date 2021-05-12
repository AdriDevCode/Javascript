const list = document.querySelector('#lista-tweets');
const submit = document.querySelector('#formulario');
let teewts = [];

eventlistener();
function eventlistener() {
	submit.addEventListener('submit', AddContent);
	document.addEventListener('DOMContentLoaded', () => {
		teewts = JSON.parse(localStorage.getItem('tweet')) || [];
		buildHtml();
	});
}

function AddContent(e) {
	e.preventDefault();
	// obtener los datos del textarea
	const tweetItem = document.querySelector('#tweet').value;

	if (tweetItem === '') {
		showError('Cannot Add an empty item, please type one😅');
		// segun el profe , con el return evitamos que se ejecute mas codigo , como el break; es curisoso, tengo que buscarlo
		return;
	} else {
		// si hay datos creara el objeto con los datos obtenidos
		const objtweet = {
			id: Date.now(),
			content: tweetItem,
		};
		// * el spread operator creara un nuevo array sin afectar el array original, pero en este caso como la variable misma ya etsaba definida , cambiara el valor de la misma, ya que no es una constante
		// Un array de objetos con los datos obtenidos
		teewts = [...teewts, objtweet];
		// llamar para crear el contenido en el html
		buildHtml();
		submit.reset();
	}
}

function buildHtml() {
	// limipia los datos repetidos dentro del html
	cleanHtml();
	// si hay datos , contruira un li para cada dato
	if (teewts.length > 0) {
		// tweet es el nombre que definio por el momento para acceder al array de datos y contruir un li para cada uno
		teewts.forEach((tweet) => {
			// crear delete button
			const bton = document.createElement('a');
			bton.classList.add('borrar-tweet');
			bton.textContent = 'X';
			list.appendChild(bton);
			bton.onclick = () => {
				deleteTweet(tweet.id);
			};

			// crear lista
			const li = document.createElement('li');
			li.textContent = tweet.content;
			list.appendChild(li);
		});
	}
	syncLocalStorage();
}

function syncLocalStorage() {
	localStorage.setItem('tweet', JSON.stringify(teewts));
}

function showError(error) {
	const container = document.querySelector('.container');
	const p = document.createElement('p');
	p.classList.add('error');
	p.textContent = error;
	container.appendChild(p);
	setTimeout(() => {
		p.remove();
	}, 2700);
}

function cleanHtml() {
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
}

function deleteTweet(id) {
	teewts = teewts.filter((tweet) => tweet.id !== id);
	// *debido a que filter crea un nuevo array , hay que llamar de nuevo la funcion , para que se syncronice con los datos actuales y el loca storage se vuelva a generar pero con los datos actuales,

	// *A difernecia de la version anterior del codigo, que yo mismo elimina los datos del local, aqui se eliminan independientemente porque toma los datos del nuevo array creados
	buildHtml();
}
