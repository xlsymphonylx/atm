//tomando elementos de html con js
const headerText = document.querySelector(".header__text");
const display = document.querySelector("#display");
const mainInput = document.querySelector("#mainInput");
const menuRetiro = document.querySelector("#menuRetiro");
const menuPrincipal = document.querySelector("#menuPrincipal");
const menuMoneda = document.querySelector("#menuMoneda");
const consulta = document.querySelector("#consulta");
const inputOptions = document.querySelector("#inputOptions");
const montoQ = document.querySelector("#montoQuetzal");
const montoD = document.querySelector("#montoDolar");
const goBack = document.querySelector("#goBack");
const menuTipoMoneda = document.querySelector("#menuTipoMoneda");

//estados
const estados = ["IngresoTarjeta"];
const tarjetas = ["0909222253", "0909221792"];
let pin = "2022";
let montoDolar = 1500;
let montoQuetzal = 10000;
let montoIngreso = 0;
// funcion de ingreso de input

//funciones de mostrado de contenido
function mostradoMenuPrincipal() {
  headerText.innerHTML = "Menu Principal";
  menuPrincipal.style.display = "initial";
}
function ocultarMenuPrincipal() {
  menuPrincipal.style.display = "none";
}
function ingresoPin() {
  headerText.innerHTML = "Ingreso de Pin";
  mainInput.value = "";
}
function ingresoTarjeta() {
  headerText.innerHTML = "Ingrese Tarjeta";
  mainInput.value = "";
}
function ocultarIngresos() {
  mainInput.value = "";
  mainInput.style.display = "none";
  inputOptions.style.display = "none";
}
function mostrarIngresos() {
  mainInput.value = "";
  mainInput.style.display = "initial";
  inputOptions.style.display = "initial";
}
function mostrarConsultaSaldo() {
  headerText.innerHTML = "Consulta de Saldo";
  consulta.style.display = "initial";
  goBack.style.display = "initial";
}
function mostrarRetiroSaldo() {
  headerText.innerHTML = "Retiro de Saldo";
  menuRetiro.style.display = "initial";
  goBack.style.display = "initial";
}
function ocultarRetiroSaldo() {
  headerText.innerHTML = "Retiro de Saldo";
  menuRetiro.style.display = "none";
  goBack.style.display = "none";
}
function ocultarConsultaSaldo() {
  consulta.style.display = "none";
  goBack.style.display = "none";
}
function mostradoCambioDePin() {
  headerText.innerHTML = "Cambio de Pin";
  mostrarIngresos();
  goBack.style.display = "initial";
}
function mostrarMenuTipoMoneda() {
  menuTipoMoneda.style.display = "initial";
}
function ocultarMenuTipoMoneda() {
  menuTipoMoneda.style.display = "none";
}
//funcion de ingreso
function ingresar(ev) {
  switch (estados[estados.length - 1]) {
    //Nos encontramos en el inico donde se ingresa la tarjeta
    case "IngresoTarjeta":
      if (validacionDeTarjeta(mainInput.value)) {
        alert("Ingresado");
        estados.push("IngresoPin");
        ingresoPin();
      } else {
        alert("error");
      }
      break;
    //Nos encontramos en donde se ingresa el pin de tarjeta
    case "IngresoPin":
      if (validacionDePin(mainInput.value)) {
        alert("Ingresado");
        estados.push("menuPrincipal");
        ocultarIngresos();
        mostradoMenuPrincipal();
      } else {
        alert("error");
      }
      break;
    case "cambioDePin":
      pin = mainInput.value;
      goBack.style.display = "none";
      ingresoTarjeta();
      estados.push("IngresoTarjeta");
      break;
    case "retiroVariable":
      retirarSaldoMonto(mainInput.value);
      ocultarIngresos();
      goBack.style.display = "none";
      mostrarMenuTipoMoneda();
      break;
  }
}

//mostral saldo
function consultaSaldo() {
  montoD.innerHTML = "$" + montoDolar;
  montoQ.innerHTML = "Q" + montoQuetzal;
  estados.push("consultaSaldo");
  ocultarMenuPrincipal();
  mostrarConsultaSaldo();
}
function cambioDePin() {
  estados.push("cambioDePin");
  ocultarMenuPrincipal();
  mostradoCambioDePin();
}

function regresar(ev) {
  switch (estados[estados.length - 1]) {
    case "consultaSaldo":
      estados.pop();
      ocultarConsultaSaldo();
      mostradoMenuPrincipal();
      break;
    case "cambioDePin":
      estados.pop();
      ocultarIngresos();
      goBack.style.display = "none";
      mostradoMenuPrincipal();
      break;
    case "retiroSaldo":
      estados.pop();
      ocultarRetiroSaldo();
      mostradoMenuPrincipal();
      break;
    case "retiroVariable":
      estados.pop();
      ocultarIngresos();
      mostrarRetiroSaldo();
      break;

    default:
      break;
  }
}

function retirarSaldoMonto(monto) {
  montoIngreso = monto;
}
function retirarQuetzales() {
  if (montoIngreso <= montoQuetzal) {
    montoQuetzal = montoQuetzal - montoIngreso;
    alert("Su nuevo monto es de Q" + montoQuetzal);
    montoIngreso = 0;
    ocultarMenuTipoMoneda();
    mostradoMenuPrincipal();
  } else {
    alert("Fondos Insuficientes");
    ocultarMenuTipoMoneda();
    mostradoMenuPrincipal();
  }
}
function retirarDolares() {
  if (montoIngreso <= montoDolar) {
    montoDolar = montoDolar - montoIngreso;
    alert("Su nuevo monto es de $" + montoDolar);
    montoIngreso = 0;
    ocultarMenuTipoMoneda();
    mostradoMenuPrincipal();
  } else {
    alert("Fondos Insuficientes");
    ocultarMenuTipoMoneda();
    mostradoMenuPrincipal();
  }
}

function retirarMontoFijo(monto) {
  retirarSaldoMonto(monto);
  ocultarRetiroSaldo();
  goBack.style.display = "initial";
  mostrarMenuTipoMoneda();
}

function menuRetiroDeSaldo(ev) {
  estados.push("retiroSaldo");
  ocultarMenuPrincipal();
  mostrarRetiroSaldo();
}
function menuRetiroVariable(ev) {
  estados.push("retiroVariable");
  ocultarRetiroSaldo();
  headerText.innerHTML = "Retiro Variable";
  goBack.style.display = "initial";
  mostrarIngresos();
}

function cancelar(ev) {
  mainInput.value = "";
}
function validacionDePin(ingresado) {
  return pin === ingresado;
}

function validacionDeTarjeta(ingresado) {
  const validado = tarjetas.find((tarjeta) => tarjeta === ingresado);
  return !!validado;
}
