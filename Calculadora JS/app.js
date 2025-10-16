class Calculadora {
    constructor(elementoOperacionAnterior, elementoOperacionActual) {
        this.elementoOperacionAnterior = elementoOperacionAnterior;
        this.elementoOperacionActual = elementoOperacionActual;
        this.limpiar();
    }

    limpiar() {
        this.operacionActual = '0';
        this.operacionAnterior = '';
        this.operacion = undefined;
        this.esNuevoNumero = true;
    }

    borrar() {
        if (this.operacionActual.length === 1) {
            this.operacionActual = '0';
            this.esNuevoNumero = true;
        } else {
            this.operacionActual = this.operacionActual.slice(0, -1);
        }
    }

    agregarNumero(numero) {
        if (numero === '.' && this.operacionActual.includes('.')) return;
        
        if (this.esNuevoNumero || this.operacionActual === '0') {
            this.operacionActual = numero === '.' ? '0.' : numero;
            this.esNuevoNumero = false;
        } else {
            this.operacionActual += numero;
        }
        
        // Limpiar la operación anterior cuando se empieza a escribir un nuevo número
        if (this.operacionAnterior.includes('=')) {
            this.operacionAnterior = '';
        }
    }

    elegirOperacion(operacion) {
        if (this.operacionActual === '') return;
        
        if (this.operacionAnterior !== '') {
            this.calcular();
        }
        
        this.operacion = operacion;
        this.operacionAnterior = this.operacionActual + ' ' + this.obtenerSimboloOperacion(operacion);
        this.operacionActual = '';
        this.esNuevoNumero = true;
    }

    calcular() {
        let calculo;
        const anterior = parseFloat(this.operacionAnterior);
        const actual = parseFloat(this.operacionActual);
        
        if (isNaN(anterior) || isNaN(actual)) return;
        
        switch (this.operacion) {
            case '+':
                calculo = anterior + actual;
                break;
            case '-':
                calculo = anterior - actual;
                break;
            case '×':
                calculo = anterior * actual;
                break;
            case '÷':
                if (actual === 0) {
                    alert("No se puede dividir por cero");
                    return;
                }
                calculo = anterior / actual;
                break;
            default:
                return;
        }
        
        this.operacionActual = calculo.toString();
        this.operacionAnterior = this.operacionAnterior + ' ' + this.operacionActual + ' =';
        this.operacion = undefined;
        this.esNuevoNumero = true;
    }

    operacionCientifica(operacion) {
        const actual = parseFloat(this.operacionActual);
        if (isNaN(actual)) return;
        
        let resultado;
        
        switch (operacion) {
            case 'sen':
                resultado = Math.sin(actual * Math.PI / 180);
                break;
            case 'cos':
                resultado = Math.cos(actual * Math.PI / 180);
                break;
            case 'tan':
                resultado = Math.tan(actual * Math.PI / 180);
                break;
            case 'log':
                if (actual <= 0) {
                    alert("El logaritmo solo está definido para números positivos");
                    return;
                }
                resultado = Math.log10(actual);
                break;
            case 'ln':
                if (actual <= 0) {
                    alert("El logaritmo natural solo está definido para números positivos");
                    return;
                }
                resultado = Math.log(actual);
                break;
            case 'raiz':
                if (actual < 0) {
                    alert("No se puede calcular la raíz cuadrada de un número negativo");
                    return;
                }
                resultado = Math.sqrt(actual);
                break;
            case 'potencia2':
                resultado = Math.pow(actual, 2);
                break;
            case 'potencia3':
                resultado = Math.pow(actual, 3);
                break;
            case 'exp':
                resultado = Math.exp(actual);
                break;
            case 'pi':
                resultado = Math.PI;
                break;
            default:
                return;
        }
        
        this.operacionActual = resultado.toString();
        this.esNuevoNumero = true;
    }

    obtenerSimboloOperacion(operacion) {
        switch (operacion) {
            case '+': return '+';
            case '-': return '-';
            case '×': return '×';
            case '÷': return '÷';
            default: return '';
        }
    }

    actualizarPantalla() {
        this.elementoOperacionActual.innerText = this.operacionActual;
        this.elementoOperacionAnterior.innerText = this.operacionAnterior;
    }
}

// Elementos del DOM
const elementoOperacionAnterior = document.querySelector('.operacion-anterior');
const elementoOperacionActual = document.querySelector('.operacion-actual');
const botonesNumero = document.querySelectorAll('.numero');
const botonesOperador = document.querySelectorAll('.operador');
const botonIgual = document.querySelector('.igual');
const botonLimpiar = document.querySelector('.limpiar');
const botonBorrar = document.querySelector('.borrar');
const botonesCientificos = document.querySelectorAll('.cientifico');
const botonModoBasico = document.getElementById('modo-basico');
const botonModoCientifico = document.getElementById('modo-cientifico');
const contenedorBotonesCientificos = document.getElementById('botones-cientificos');

// Crear calculadora
const calculadora = new Calculadora(elementoOperacionAnterior, elementoOperacionActual);

// Event listeners para números
botonesNumero.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.agregarNumero(boton.getAttribute('data-numero'));
        calculadora.actualizarPantalla();
    });
});

// Event listeners para operaciones básicas
botonesOperador.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.elegirOperacion(boton.getAttribute('data-operacion'));
        calculadora.actualizarPantalla();
    });
});

// Event listener para igual
botonIgual.addEventListener('click', () => {
    calculadora.calcular();
    calculadora.actualizarPantalla();
});

// Event listener para limpiar
botonLimpiar.addEventListener('click', () => {
    calculadora.limpiar();
    calculadora.actualizarPantalla();
});

// Event listener para borrar
botonBorrar.addEventListener('click', () => {
    calculadora.borrar();
    calculadora.actualizarPantalla();
});

// Event listeners para operaciones científicas
botonesCientificos.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.operacionCientifica(boton.getAttribute('data-operacion'));
        calculadora.actualizarPantalla();
    });
});

// Cambio de modo
botonModoBasico.addEventListener('click', () => {
    botonModoBasico.classList.add('activo');
    botonModoCientifico.classList.remove('activo');
    contenedorBotonesCientificos.classList.add('oculto');
});

botonModoCientifico.addEventListener('click', () => {
    botonModoCientifico.classList.add('activo');
    botonModoBasico.classList.remove('activo');
    contenedorBotonesCientificos.classList.remove('oculto');
});

// Inicializar pantalla
calculadora.actualizarPantalla();