// *Variables
const carrito = document.getElementById('carrito');
const listaCursos = document.getElementById('lista-cursos');
const cursoTabla = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBoton = document.getElementById('vaciar-carrito');

// *listeners
cargarEventListener();
function cargarEventListener() {
  // evento que sucedera cuando de click en agregar cursos
  listaCursos.addEventListener('click', comprarCurso);
  // evento cuando se elimina dentro del carrito de compras
  carrito.addEventListener('click', eliminarElemento);
  // evento para eliminar todos a la vez con vaciar carrito
  vaciarCarritoBoton.addEventListener('click', vaciarCarrito);
  // Evento de imprimir el local storage en la pagina web cuando se inicialize
  document.addEventListener('DOMContentLoaded', leerContenidodelLocalStorage);
}
//*functions
// functions que agrega el curso al carrito
function comprarCurso(e) {
  e.preventDefault();
  // delegation para agregar-carrito
  if (e.target.classList.contains('agregar-carrito')) {
    const curso = e.target.parentElement.parentElement;
    // se crea una nueva funcion para usar los elementos del curso
    leerDatosCurso(curso);
  }
}
// leer datos del curso
function leerDatosCurso(curso) {
  const infocurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
  };
  insertarCarrito(infocurso);
}
// Creando cada uno de los elementos para insertarlos dentro de la tabla
function insertarCarrito(curso) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>
      <img src ="${curso.imagen}" width ="100"/>
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
      <a href = "#" class = "borrar-curso" data-id ="${curso.id}">X</a>
    </td>

    `;
  cursoTabla.appendChild(row);
  // Que se ejecute la funcion de locla storage apenes se cree la tabla
  guardarElementosLocalStorage(curso);
}
// eliminar el elemnto o curso con la X
function eliminarElemento(e) {
  e.preventDefault;
  let curso, cursoid;
  if (e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoid = curso.querySelector('a').getAttribute('data-id');
  }
  eliminarCursoLocalSorage(cursoid);
}

function vaciarCarrito() {
  // *metodo lento
  // cursoTabla.innerHTML = '';
  // !metodo rapido
  while (cursoTabla.firstChild) {
    cursoTabla.removeChild(cursoTabla.firstChild);
  }
  vaciartodolocalstorage();
  return false;
}
// Guardar los datos del local storage
function guardarElementosLocalStorage(curso) {
  let cursos;
  cursos = obtenerCursosLocalStorage();
  cursos.push(curso);
  localStorage.setItem('cursoss', JSON.stringify(cursos));
}
// obtener los datoa del local storage

function obtenerCursosLocalStorage() {
  let cursosLS;
  if (localStorage.getItem('cursoss') === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem('cursoss'));
  }

  return cursosLS;
}

// Imprimir el contenido del localStorage
// EL nombre de la variable aqui no importa, ya que no afecta a las otras funciones
function leerContenidodelLocalStorage() {
  let cursosLS;
  cursosLS = obtenerCursosLocalStorage();
  cursosLS.forEach(function (curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
      <img src ="${curso.imagen}" width ="100"/>
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
      <a href = "#" class = "borrar-curso" data-id ="${curso.id}">X</a>
    </td>

    `;
    cursoTabla.appendChild(row);
  });
}
// eliminar cada elemento por el ID en el  local storage
function eliminarCursoLocalSorage(curso) {
  let cursosLS;
  // Obtenemos el arreglo de cursos
  cursosLS = obtenerCursosLocalStorage();
  // Iteramos comparando el ID del curso borrado con los del LS
  cursosLS.forEach(function (cursoLS, index) {
    if (cursoLS.id === curso) {
      cursosLS.splice(index, 1);
    }
  });
  // Añadimos el arreglo actual a storage
  localStorage.setItem('cursoss', JSON.stringify(cursosLS));
}
// Eliminar todos los elementos del local stoage de una sola vez

function vaciartodolocalstorage() {
  localStorage.clear();
}
