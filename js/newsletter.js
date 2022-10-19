const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,32}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	codigopostal: /^[0-9]{4,8}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{6,11}$/, // 6 a 11 numeros.
	numeros: /^[0-9]{1,6}$/
}

const obligatorios = {
	provincia:"",
	birthdate:"",
	suscripcion:"",
	preferencias:[]	
};

const validarFormulario = (e) => {
	if (e.target.value !==""){
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

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(campo).classList.remove('incorrecto');
		document.getElementById(campo).classList.add('correcto');
		setTimeout( () => {document.getElementById(campo).classList.remove('correcto')}, 5000);
	} else {
		document.getElementById(campo).classList.remove('correcto');
		document.getElementById(campo).classList.add('incorrecto');

	}
}

const validarPassword2 = () => {
	const pass1 = document.getElementById('password');
	const pass2 = document.getElementById('password2');
	if (pass1.value !== "") {
		if (pass1.value !== pass2.value) {
		document.getElementById('password2').classList.remove('correcto');
		document.getElementById('password2').classList.add('incorrecto');

		} else {
		document.getElementById('password2').classList.add('correcto');
		document.getElementById('password2').classList.remove('incorrecto');

		}
	}
}

inputs.forEach((input) => {
	input.addEventListener('keydown', validarFormulario);
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);

})

//BOTON DE ENVIAR
formulario.addEventListener('submit', (e) => {
	
	//evito que el botón envíe los datos del formulario
	e.preventDefault();

	//obtengo el valor de la provincia seleccionada;
	obligatorios.provincia = document.getElementById('selProvincia').value 
	
	//obtengo los checkboxes marcados;
	let checkbox = document.querySelectorAll('.checkboxes');
	checkbox.forEach((p)=>{
		if (p.checked){
		obligatorios.preferencias.push(p.value);
		}
	});


	//obtengo el radio marcado
	if (document.querySelector('[value="gratis"]').checked){
		obligatorios.suscripcion = "Suscripcion Gratuita";
	}else {
		obligatorios.suscripcion = "Suscripcion Paga";
	}
	
	//obtengo el valor de birthdate
	obligatorios.birthdate = document.querySelector('[type="date"]').value;


console.log(obligatorios.preferencias);
console.log(obligatorios.provincia);
console.log(obligatorios.suscripcion);
console.log(obligatorios.birthdate);
});