// variables
const monto = parseInt(prompt('Cual es tu Presupuesto?'));
const submit = document.getElementById('agregar-gasto');
const gastosListado = document.querySelector('#gastos ul');

let calcularpresupuesto;
let res = this.restante;

// class
class Budjet {
	constructor(monto) {
		this.monto = monto;
		this.restante = monto;
		this.gasto = [];
	}
	presupuestoRestante(cantidad = 0) {
		return (this.restante -= Number(cantidad));
	}
	nuevoGasto(gastos) {
		this.gasto = [...this.gasto, gastos];
		this.calcularRestante();
	}
	calcularRestante() {
		const gastado = this.gasto.reduce(
			(total, gastos) => total + gastos.cantidad,
			0
		);

		this.restante = this.monto - gastado;
	}
	delete(id) {
		this.gasto = this.gasto.filter((gastos) => gastos.id !== id);
		this.calcularRestante();
	}
}

class Interfaz {
	insertarInterfaz(cantidad) {
		const { monto, restante } = cantidad;
		const spanPresupuesto = document.getElementById('total');
		const spanrestante = document.getElementById('restante');
		spanPresupuesto.innerHTML = `${monto}`;
		spanrestante.innerHTML = `${restante}`;
	}

	imprimirAlerta(mensaje, tipo) {
		const div = document.createElement('div');
		// son clases de bootstrap pero si no quiero usarlas puedo modificarlas y hacerlas en el css
		div.classList.add('text-center', 'alert');
		if (tipo === 'error') {
			div.classList.add('alert-danger');
		} else {
			div.classList.add('alert-success');
		}
		div.textContent = mensaje;
		document.querySelector('.primario').insertBefore(div, submit);
		setTimeout(() => {
			div.remove();
		}, 2700);
	}

	listarGastos(gasto) {
		// Limpiar HTML
		this.limpiarHTML();

		// Iterar sobre los gastos
		gasto.forEach((gasto) => {
			const { Nombre, cantidad, id } = gasto;

			// Crear un LI
			const nuevoGasto = document.createElement('li');
			nuevoGasto.className =
				'list-group-item d-flex justify-content-between align-items-center';
			nuevoGasto.dataset.id = id;

			// Insertar el gasto
			nuevoGasto.innerHTML = `
                ${Nombre}
                <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
            `;

			// boton borrar gasto.
			const btnBorrar = document.createElement('button');
			btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
			btnBorrar.textContent = 'Borrar';
			nuevoGasto.appendChild(btnBorrar);
			btnBorrar.onclick = () => {
				borrarItem(id);
			};

			// Insertar al HTML
			gastosListado.appendChild(nuevoGasto);
		});
	}
	montoActalizado(restante) {
		document.getElementById('restante').innerHTML = `${restante}`;
	}

	prepCondition(datosPrep) {
		const div = document.querySelector('.restante');
		const { monto, restante } = datosPrep;
		if (restante <= monto * 0.25) {
			div.classList.add('lowbud');
		} else if (restante <= monto * 0.5) {
			div.classList.remove('alert-success');
			div.classList.add('midbud');
		} else {
			div.classList.remove('midbud', 'lowbud');
			div.classList.add('alert-success');
		}

		if (restante <= 0) {
			UI.imprimirAlerta('saldo acabado', 'error');
			submit.querySelector('button[type="submit"]').disabled = true;
		}
	}

	limpiarHTML() {
		while (gastosListado.firstChild) {
			gastosListado.removeChild(gastosListado.firstChild);
		}
	}
}

// AddEventlistener
addevents();
function addevents() {
	document.addEventListener('DOMContentLoaded', Validacion);
	document.addEventListener('submit', agregarGasto);
}
// se instancia el nuevo objecto de manera global , como no tiene constructor no hay que ponerle valores
let UI = new Interfaz();

function Validacion() {
	if (monto === null || isNaN(monto) || monto <= 0) {
		alert('Monto no valido, Por favor tipea uno correcto');
		window.location.reload();
	} else {
		// *instanciar el monto
		calcularpresupuesto = new Budjet(monto);

		// instanciar la interfaz

		UI.insertarInterfaz(calcularpresupuesto);
	}
}

function agregarGasto(e) {
	e.preventDefault();
	const Nombre = document.getElementById('gasto').value;
	// la cantidad viene como string, number cambiara a numero
	const cantidad = Number(document.getElementById('cantidad').value);
	// el return evitara que se ejecute el codigo despues del if , si es que se ejecuta el if
	// pero no tiene mucho caso usar el return ya que se puede usar el else que hace lo mimsmo
	if (Nombre === '' || cantidad === '') {
		UI.imprimirAlerta('Datos incorrectos', 'error');
		return;
	} else if (typeof Nombre === 'number' || cantidad <= 0 || isNaN(cantidad)) {
		UI.imprimirAlerta('Datos incorrectos', 'error');
		return;
	}
	// *  diferente del destructuring, esto se conoce como object literal enhancement
	//  * crea un nuevo objecto de los datos
	// * como Nombre y cantidad son valores ya declarados, no es necesario repetir sus nombres dentro del objeto, pero si se le cambia los nombres, hay que especificar cuales son los valores para usar dentro del objeto
	const gastos = { Nombre, cantidad, id: Date.now() };

	calcularpresupuesto.nuevoGasto(gastos);

	UI.imprimirAlerta('Datos agregados');

	// imprimir los gastos
	const { gasto, restante } = calcularpresupuesto;
	UI.listarGastos(gasto);

	// actualiza los datos del restante

	UI.montoActalizado(restante);

	// aplicar las condiciones para el tnato porciento gastado

	UI.prepCondition(calcularpresupuesto);

	// Alerta success
	submit.reset();
}

function borrarItem(id) {
	calcularpresupuesto.delete(id);
	const { gasto, restante } = calcularpresupuesto;
	UI.listarGastos(gasto);

	UI.montoActalizado(restante);
	UI.prepCondition(calcularpresupuesto);
}
