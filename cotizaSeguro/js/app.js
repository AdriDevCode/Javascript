// Prototype para seguro
function Seguro(brand, year, radioType) {
	this.brand = brand;
	this.year = year;
	this.radioType = radioType;
}
Seguro.prototype.calcularSeguro = function () {
	let cantidad;
	const base = 2000;
	switch (this.brand) {
		case '1':
			cantidad = base * 1.15;
			break;
		case '2':
			cantidad = base * 1.05;
			break;
		case '3':
			cantidad = base * 1.5;
			break;
	}
	// *leer el year
	const yearDifference = new Date().getFullYear() - this.year;
	// *Cada year tendra una diferencia menos del 3%
	cantidad -= 0.03 * yearDifference * cantidad;
	//
	if (this.radioType === 'basico') {
		cantidad *= 1.3;
	} else {
		cantidad *= 1.5;
	}
	return cantidad;
};
// Imprimir el resultado de la cotizacion si todo fue seleccionado correctamente

Interfaz.prototype.mostrarSeguro = function (seguro, total) {
	const resultado = document.getElementById('resultado');
	let brand;
	switch (seguro.brand) {
		case '1':
			brand = 'Americano';
			break;
		case '2':
			brand = 'Asiatico';
			break;
		case '3':
			brand = 'Europeo';
			break;
	}
	const div = document.createElement('div');
	div.innerHTML = `
		<p class ="header">Tu Resumen </p>
		<p>Marca: ${brand} </p>
		<p>Periodo: ${seguro.year}</p>
		<p>Tipo: ${seguro.radioType}</p>
		<p>Periodo: ${total}</p>
	`;

	// spinner

	const spinner = document.querySelector('#cargando img');
	spinner.style.display = 'block';
	setTimeout(function () {
		spinner.style.display = 'none';
		resultado.appendChild(div);
	}, 1500);
};

// Para interfaz de resultadp
function Interfaz() {}

// Mensaje que se imprimira en el html si hay un error
Interfaz.prototype.showError = function (mensaje, tipo) {
	const div = document.createElement('div');
	if (tipo === 'error') {
		div.classList.add('mensaje', 'error');
	} else {
		div.classList.add('mensaje', 'correcto');
	}
	div.innerHTML = `${mensaje}`;
	formulario.insertBefore(div, document.querySelector('.form-group'));
	setTimeout(function () {
		document.querySelector('.mensaje').remove();
	}, 2500);
};

// AddeventListerns
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', ClickSbumit);

function ClickSbumit(e) {
	e.preventDefault();

	// *obtener el value de los options de las procediancias de los carros

	const brand = document.getElementById('marca');
	const selectedBrand = brand.options[brand.selectedIndex].value;

	// *Obtener el value de los years

	const year = document.getElementById('anio');
	const yearSelected = year.options[year.selectedIndex].value;

	//* Obtener el value de los checked radio

	const radioType = document.querySelector('input[name="tipo"]:checked').value;

	// Crear instancia de interfaz
	const interfaz = new Interfaz();

	// *Revisar que todos los campos esten seleccionados, aunque en este caso hay dos que siempre estan seleccionados por defecto

	// Lo que sucede aqui , es que al retaronar el valor de value, si no se selecciona un objeto , o si el objeto no tiene value porque estamos seleccionado el value de los objetos, estos tendran como resultado un string vacio ''

	if (selectedBrand === '' || yearSelected === '' || radioType === '') {
		// uso del prototype para mostrar un error
		interfaz.showError('faltan datos, prueba de nuevo', 'error');
	} else {
		const resultados = document.querySelector('#resultado div');
		if (resultados != null) {
			resultados.remove();
		}
		// uso del prototype para mostrar los datos seleccionados
		const seguro = new Seguro(selectedBrand, yearSelected, radioType);
		const cantidad = seguro.calcularSeguro();
		interfaz.mostrarSeguro(seguro, cantidad);

		// * estoy reutilizando la instancia de showError , por el protoype ya creado , siendo el mismo codido pero cambiando las clases por la clase .correcto creada

		interfaz.showError('Cotizando.....', 'correcto');
	}
}

// Get Current Year
const max = new Date().getFullYear(),
	min = max - 20;

const yearselect = document.getElementById('anio');
for (let i = max; i > min; i--) {
	let option = document.createElement('option');
	option.value = i;
	option.innerHTML = i;
	yearselect.appendChild(option);
}
