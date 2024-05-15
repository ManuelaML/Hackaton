function validarFormulario() {
  var nombre = document.getElementById('nombre').value;
  var email = document.getElementById('email').value;
  var telefono = document.getElementById('telefono').value;
  var comentario = document.getElementById('comentario').value;
  var terminos = document.getElementById('terminos').checked;
  var errorNombre = document.getElementById('errorNombre');
  var errorEmail = document.getElementById('errorEmail');
  var errorTelefono = document.getElementById('errorTelefono');
  var errorComentario = document.getElementById('errorComentario');
  var errorTerminos = document.getElementById('errorTerminos');

  var valido = true;

  // Validación del nombre
  if (nombre === '') {
    errorNombre.textContent = 'Por favor, introduce tu nombre.';
    valido = false;
  } else {
    errorNombre.textContent = '';
  }

  // Validación del email
  if (email === '') {
    errorEmail.textContent = 'Por favor, introduce tu correo electrónico.';
    valido = false;
  } else {
    errorEmail.textContent = '';
  }

  // Validación del teléfono
  if (telefono === '') {
    errorTelefono.textContent = 'Por favor, introduce tu teléfono.';
    valido = false;
  } else {
    errorTelefono.textContent = '';
  }

  // Validación del comentario
  if (comentario === '') {
    errorComentario.textContent = 'Por favor, déjanos tus comentarios.';
    valido = false;
  } else {
    errorComentario.textContent = '';
  }

  // Validación de los términos y condiciones
  if (!terminos) {
    errorTerminos.textContent = 'Debes aceptar los términos y condiciones.';
    valido = false;
  } else {
    errorTerminos.textContent = '';
  }

  return valido;
}

function cancelar() {
  document.getElementById('myForm').reset();
}
