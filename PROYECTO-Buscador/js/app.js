// variables
const resultado = document.querySelector('#resultado');
const id = document.getElementById('year');
const currentYear = new Date().getFullYear();
const pastyear = currentYear - 10;
// option selectors

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// event triggered when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
	mostrarAutos(autos);
	optionyear();
});

// where the data selections is going to be storage
const datosBusqueda = {
	marca: '',
	year: '',
	minimo: '',
	maximo: '',
	puertas: '',
	transmision: '',
	color: '',
};

// what 'change' does : triggered when it changes its selection among its options
marca.addEventListener('change', (e) => {
	datosBusqueda.marca = e.target.value;
	filtrarAuto();
});
year.addEventListener('change', (e) => {
	datosBusqueda.year = e.target.value;
	filtrarAuto();
});
minimo.addEventListener('change', (e) => {
	datosBusqueda.minimo = e.target.value;
	filtrarAuto();
});
maximo.addEventListener('change', (e) => {
	datosBusqueda.maximo = e.target.value;
	filtrarAuto();
});
puertas.addEventListener('change', (e) => {
	datosBusqueda.puertas = e.target.value;
	filtrarAuto();
});
transmision.addEventListener('change', (e) => {
	datosBusqueda.transmision = e.target.value;
	filtrarAuto();
});
color.addEventListener('change', (e) => {
	datosBusqueda.color = e.target.value;
	filtrarAuto();
});

// will create the data displaying to html
function mostrarAutos(autos) {
	LimipiaHtml();
	// como el sscript data ya esta concetado al index, simplemente con llamar el array, ya se puede utilizar los datos del object .
	autos.forEach((auto) => {
		const { marca, modelo, year, puertas, transmision, precio, color } = auto;
		const autoHtml = document.createElement('p');
		autoHtml.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} - ${transmision} - ${precio} - ${color}
        `;
		resultado.appendChild(autoHtml);
	});
}

function LimipiaHtml() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}

function optionyear() {
	for (i = currentYear; i > pastyear; i--) {
		const option = document.createElement('option');
		option.value = i;
		option.textContent = i;
		id.appendChild(option);
	}
}

function filtrarAuto() {
	// filter creara un nuevo arreglo con los datos encontrados
	// este filtra por condiciones, cuando un valor es true , significa que cumple la condicion y estara en el nuevo arreglo , pero si es falso seguira iterando los siguientes valores para ver si cumple con la condicion
	const filtrado = autos
		.filter(filtrarMarca)
		.filter(filterYear)
		.filter(filterMin)
		.filter(filterMax)
		.filter(filtrarPuertas)
		.filter(filtrarTransmision)
		.filter(filtrarColor);

	mostrarAutos(filtrado);
}

function filtrarMarca(auto) {
	const { marca } = datosBusqueda;
	// cuando se lo deja solo, la condicion sera si tiene valor
	if (marca) {
		// cuando los autos de la base de datos sea igual a los datos de la marca del objeto creado, creara un nuevo array con todos los valores que hayan sido true
		return auto.marca === marca;
	} else {
		return auto;
	}
}
function filterYear(auto) {
	const { year } = datosBusqueda;
	if (year) {
		return auto.year == year;
	} else {
		return auto;
	}
}
function filterMin(auto) {
	const { minimo } = datosBusqueda;
	if (minimo) {
		return auto.precio >= minimo;
	} else {
		return auto;
	}
}
function filterMax(auto) {
	const { maximo } = datosBusqueda;
	if (maximo) {
		return auto.precio <= maximo;
	} else {
		return auto;
	}
}
function filtrarPuertas(auto) {
	if (datosBusqueda.puertas) {
		return auto.puertas == datosBusqueda.puertas;
	}
	return auto;
}

function filtrarTransmision(auto) {
	if (datosBusqueda.transmision) {
		return auto.transmision == datosBusqueda.transmision;
	}
	return auto;
}

function filtrarColor(auto) {
	if (datosBusqueda.color) {
		return auto.color == datosBusqueda.color;
	}
	return auto;
}
