// Prototype para seguro
function seguro(brand, year, tipo) {
	this.brand = brand;
	this.year = year;
	this.tipo = tipo;
}
// Para interfaz de resultadp
function interfaz() {}
// AddeventListerns
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', ClickSbumit);
function ClickSbumit(e) {
	e.preventDefault();
	console.log('click');
}

const max = new Date().getFullYear(),
	min = max - 20;

const yearselect = document.getElementById('anio');
for (let i = max; i > min; i--) {
	let option = document.createElement('option');
	option.value = i;
	option.innerHTML = i;
	yearselect.appendChild(option);
}
