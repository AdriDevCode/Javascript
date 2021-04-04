// Variables

const listTweets = document.getElementById('lista-tweets');
// Event listener
eventListener();
// el event listener del tipo submit quiere decir que la funcion se realizara cuando se haga un submit
function eventListener() {
  document
    .querySelector('#formulario')
    .addEventListener('submit', agregartweet);
  // cuando se haga click en borrar
  listTweets.addEventListener('click', borrartweet);
}

// functions
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
}

// Borrar tweet
function borrartweet(e) {
  e.preventDefault();
  if (e.target.className === 'borrar-tweet') {
    console.log(e.target.parentElement.remove());
    alert('eliminado');
  }
}
