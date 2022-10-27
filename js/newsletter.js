//obtengo el elemento formulario de html
const formulario = document.getElementById('formulario');

//reseteo el formulario cada vez de actualizar;
formulario.reset();

//obtengo el array de elementos input pertenecientes al elemento de id formulario;
const inputs = document.querySelectorAll('#formulario input');

//obtengo el elemento de selección de provincia;
const select = document.querySelector('#selProvincia');

//obtengo el elemento de ingreso de fecha
const birthdate = document.querySelector('#birthdate');

//defino las expresiones regulares a comparar con lo ingresado en campos input;
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,32}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	codigopostal: /^[0-9]{4,8}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{6,11}$/, // 6 a 11 numeros.
	numeros: /^[0-9]{1,6}$/
}

//este objeto lo declaro para verificar cada campo;
const obligatorios = {
	nombres: false,
	apellidos: false,
	direccion: false,
	altura: false,
	codigopostal: false,
	email: false,
	birthdate: false,
	checkbox: false,
	radio: false,
	usuario: false,
	password: false
};
//declaro esta variable de control final para determinar si el formulario se envía o no
var formularioCompleto = false;


//en cada presionar, soltar tecla o sacar foco de cualquier campo, se ejecuta lo siguiente
const validarFormulario = (e) => {
	if (e.target.value !== "") {
		switch (e.target.name) {
			case "varNombre":
				validarCampo(expresiones.nombre, e.target, 'nombres');
				break;
			case "varApellido":
				validarCampo(expresiones.nombre, e.target, 'apellidos');
				break;
			case "varDireccion":
				validarCampo(expresiones.nombre, e.target, 'direccion');
				break;
			case "varAltura":
				validarCampo(expresiones.numeros, e.target, 'altura');
				break;
			case "varCodigoPostal":
				validarCampo(expresiones.codigopostal, e.target, 'codigopostal');
				break;
			case "varEmail":
				validarCampo(expresiones.correo, e.target, 'email');
				break;
			case "varUsuario":
				validarCampo(expresiones.usuario, e.target, 'usuario');
				break;
			case "varPassword":
				validarCampo(expresiones.password, e.target, 'password');
				validarPassword2();
				break;
			case "varPassword2":
				validarPassword2();
				break;
		}
	}
}

//función que evalua la validez del valor del campo modificado con las expresiones regulares y agrega y quita clases sobre los elementos input
const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(campo).classList.remove('incorrecto');
		document.getElementById(campo).classList.add('correcto');
		obligatorios[campo] = true;

		setTimeout(() => { document.getElementById(campo).classList.remove('correcto') }, 5000);
	} else {
		document.getElementById(campo).classList.remove('correcto');
		document.getElementById(campo).classList.add('incorrecto');
		obligatorios[campo] = false;
	}
}

//función que evalua los campos de password para verificar si son iguales y agrega y quita clases sobre los elementos input
const validarPassword2 = () => {
	const pass1 = document.getElementById('password');
	const pass2 = document.getElementById('password2');
	if (pass1.value !== "") {
		if (pass1.value !== pass2.value) {
			document.getElementById('password2').classList.remove('correcto');
			document.getElementById('password2').classList.add('incorrecto');
			obligatorios['password'] = false;

		} else {
			document.getElementById('password2').classList.add('correcto');
			document.getElementById('password2').classList.remove('incorrecto');
			obligatorios['password'] = true;
		}
	}
}


//por cada campo input que devuelve el querySelector, se agrega un listener en cada accion del teclado y al sacar el foco de cada input
inputs.forEach((input) => {
	input.addEventListener('keydown', validarFormulario);
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
})

//BOTON DE ENVIO DE DATOS A FORMSPREE
formulario.addEventListener('submit', validaryCargar);

//función que valida primero que todas las propiedades de "obligatorios" sean true, y en ese caso, carga el formulario a formspree, sino alerta sobre datos incorrectos y evita el envio
function validaryCargar (r){
	validarTodo();
	if (formularioCompleto){
		cargarForm(r);
	}  else {
		r.preventDefault();
		alert('Al formulario le faltan datos o posee datos incorrectos, por favor revise su selección');
	}
}

//función que verifica que todos los campos tengan algún dato válido, incluido inputs, checkboxes, fecha y botones radio
function validarTodo() {
	inputs.forEach((input) => {
		if (input.type === 'checkbox' && input.checked) {
			obligatorios['checkbox'] = true;
		}
		if (input.type === 'radio' && input.checked) {
			obligatorios['radio'] = true;
		}
	}
	)
	if (birthdate.value.length !== 0) {
		obligatorios['birthdate'] = true;
	}
	for (j in obligatorios) {//esta función recorre el objeto obligatorios y si hay alguna propiedad con valor falso, asigna falso a formularioCompleto
		formularioCompleto = true;
		if (obligatorios[j] == false) {
			return formularioCompleto = false;
		}
	}
}

async function cargarForm(e) {
		e.preventDefault();
		const form = new FormData(formulario);
		const response = await fetch(formulario.action, {
			method: formulario.method,
			body: form,
			headers: {
				'Accept': 'application/json'
			}
		})
		if (response.ok) {
			formulario.reset();
			alert('Formulario Enviado con éxito');
		}
	}
