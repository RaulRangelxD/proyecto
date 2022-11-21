// acceder al formulario
const formulario = document.getElementById("formulario");
//acceder al boton volver
const volver = document.querySelector("#formularioBtnVolver");
// almacenar inputs del formulario
const inputs = document.querySelectorAll("#formulario input");
// expresiones regulares
const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};
// variables para detectar que los campos esten correctamente llenados
const campos = {
  Usuario: false,
  Nombre: false,
  Password: false,
  Password2: false,
  Correo: false,
  Telefono: false,
};
const validarFormulario = (e) => {
  // detectar que apartado del formulario se está modificando especificamente
  switch (e.target.name) {
    // caso Usuario
    case "usuario":
      // Llamar a la funcion para validar si el campo tiene algun error
      validarCampo(expresiones.usuario, e.target, "Usuario");
      break;
    // caso Nombre
    case "nombre":
      // Llamar a la funcion para validar si el campo tiene algun error
      validarCampo(expresiones.nombre, e.target, "Nombre");
      break;
    // caso Password
    case "password":
      // Llamar a la funcion para validar si el campo tiene algun error
      validarCampo(expresiones.password, e.target, "Password");
      validarPassword2();
      break;
    // caso password2
    case "password2":
      validarPassword2();
      break;
    // caso Correo
    case "correo":
      // Llamar a la funcion para validar si el campo tiene algun error
      validarCampo(expresiones.correo, e.target, "Correo");
      break;
    // caso Telefono
    case "telefono":
      // Llamar a la funcion para validar si el campo tiene algun error
      validarCampo(expresiones.telefono, e.target, "Telefono");
      break;
  }
};
// FORMA DE VALIDAR CAMPO SIN FUNCION(esto se escribiria en cada case!!!):
// // detectar algun error usando las expresiones definidas
// if (expresiones.usuario.test(e.target.value)) {
//   // remover modificador cuando el valor es correto
//   document
//     .querySelector("#grupoUsuario .formularioInputError")
//     .classList.remove("formularioInputError-activo");
// } else {
//   // añadir modificador cuando el valor es incorreto
//   document
//     .querySelector("#grupoUsuario .formularioInputError")
//     .classList.add("formularioInputError-activo");
// }

// Funcion para validar que campo se está modificando
const validarCampo = (expresion, input, campo) => {
  // detectar algun error usando las expresiones definidas
  if (expresion.test(input.value)) {
    // remover modificador cuando el valor es correto
    document
      .querySelector(`#grupo${campo} .formularioInputError`)
      .classList.remove("formularioInputError-activo");
    // colocar campo en verdadero
    campos[campo] = true;
  } else {
    // añadir modificador cuando el valor es incorreto
    document
      .querySelector(`#grupo${campo} .formularioInputError`)
      .classList.add("formularioInputError-activo");
    // colocar campo en falso
    campos[campo] = false;
  }
};
// Funcion para validar que las contraseñas sean iguales
const validarPassword2 = () => {
  // guardar ambas contraseñas
  const inputPassword1 = document.getElementById("password");
  const inputPassword2 = document.getElementById("password2");
  // comprobar que ambas son iguales
  if (inputPassword1.value == inputPassword2.value) {
    // remover modificador cuando el valor es correto
    document
      .querySelector(`#grupoPassword2 .formularioInputError`)
      .classList.remove("formularioInputError-activo");
    // colocar campo en verdadero
    campos["Password2"] = true;
  } else {
    // añadir modificador cuando el valor es incorreto
    document
      .querySelector(`#grupoPassword2 .formularioInputError`)
      .classList.add("formularioInputError-activo");
    // colocar campo en falso
    campos["Password2"] = false;
  }
};
// detectar inputs
inputs.forEach((input) => {
  // detectar cuando se levante una tecla
  input.addEventListener("keyup", validarFormulario);
  // detectar cuando se de click fuera del cuadro de texto
  input.addEventListener("blur", validarFormulario);
});
// acceder al evento del boton de enviar
formulario.addEventListener("submit", (e) => {
  // evita que al darle al boton enviar se envie automaticamente el formulario
  e.preventDefault();
  // obtener valor de el checkbox
  const terminos = document.getElementById("terminos");
  // obtener valor de el radio
  const radio1 = document.getElementById("hombre");
  const radio2 = document.getElementById("mujer");
  // obtener valor de la edad
  const edad = parseInt(document.getElementById("edad").value);
  // comprobar que todos los campos esten correctamente llenados
  if (
    campos.Usuario &&
    campos.Nombre &&
    campos.Password &&
    campos.Password2 &&
    campos.Correo &&
    campos.Telefono &&
    terminos.checked &&
    edad >= 1 &&
    (radio1.checked || radio2.checked)
  ) {
    // reiniciar el formulario
    formulario.reset();
    // activar mensaje de envio
    document
      .getElementById("formularioMensajeExito")
      .classList.add("formularioMensajeExito-activo");
    // desactivar mensaje de envio a los 5 segundos
    setTimeout(() => {
      document
        .getElementById("formularioMensajeExito")
        .classList.remove("formularioMensajeExito-activo");
      history.back();
    }, 5000);
    // desactivar mensaje de error
    document
      .getElementById("formularioMensaje")
      .classList.remove("formularioMensaje-activo");
  } else {
    // activar mensaje de error
    document
      .getElementById("formularioMensaje")
      .classList.add("formularioMensaje-activo");
  }
});
volver.addEventListener("click", (e) => {
  history.back();
});
