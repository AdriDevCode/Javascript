// variab;es

const presupuesto = parseInt(prompt('Cual es tu Presupuesto?'));

let calcularpresupuesto;

// class
class Presupuesto {
	constructor(presupuesto) {
		this.presupuesto = presupuesto;
		this.restante = presupuesto;
	}
	presupuestoRestante(cantidad = 0) {
		return (this.restante -= Number(cantidad));
	}
}
class Interfaz {
	insertarInterfaz(cantidad) {
		const spanPresupuesto = document.getElementById('total');
		const spanrestante = document.getElementById('restante');
		spanPresupuesto.innerHTML = `${cantidad}`;
		spanrestante.innerHTML = `${cantidad}`;
	}
}

// AddEventlistener
document.addEventListener('DOMContentLoaded', function () {
	if (presupuesto === null || isNaN(presupuesto) === true) {
		alert('debe ser un numero');
		window.location.reload();
	} else {
		// instanciar el presupuesto
		calcularpresupuesto = new Presupuesto(presupuesto);
		// instanciar la interfaz
		const UI = new Interfaz();
		UI.insertarInterfaz(calcularpresupuesto.presupuesto);
	}
});
