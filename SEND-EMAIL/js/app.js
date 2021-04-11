// Variab;es
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');
// Event listener
eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', incioApp);
  // campos del formulario
  email.addEventListener('blur', validarCampo);
  asunto.addEventListener('blur', validarCampo);
  mensaje.addEventListener('blur', validarCampo);
  formularioEnviar.addEventListener('submit', enviarEmail);
  resetBtn.addEventListener('click', resetFormulario);
}
// functions
function incioApp() {
  btnEnviar.disabled = true;
}

function validarCampo() {
  let errores = document.querySelectorAll('.error');

  validarLongitud(this);
  if (this.type === 'email') {
    validarEmail(this);
  }
  if (email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
    if (errores.length === 0) {
      btnEnviar.disabled = false;
    }
  }
}
// aqui campo toma el valor de this , tiene como target todo el elemento html
function validarLongitud(campo) {
  if (campo.value.length > 0) {
    campo.style.borderBottomColor = 'green';
    campo.classList.remove('error');
  } else {
    campo.style.borderBottomColor = 'red';
    campo.classList.add('error');
  }
}

function validarEmail(campo) {
  const mensaje = campo.value;
  if (mensaje.indexOf('@') !== -1) {
    campo.style.borderBottomColor = 'green';
    campo.classList.remove('error');
  } else {
    campo.style.borderBottomColor = 'red';
    campo.classList.add('error');
  }
}

function enviarEmail(e) {
  e.preventDefault();
  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'block';
  const enviado = document.createElement('img');
  enviado.src = 'img/mail.gif';
  enviado.style.display = 'blocl';
  setTimeout(function () {
    spinner.style.display = 'none';
    document.querySelector('#loaders').appendChild(enviado);
    setTimeout(function () {
      enviado.remove();
      formularioEnviar.reset();
    }, 5000);
  }, 3000);
}

// Resetear el formulario
function resetFormulario(e) {
  formularioEnviar.reset();
  e.preventDefault();
}
