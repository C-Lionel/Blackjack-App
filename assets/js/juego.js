/** 
* 2C = Two of Clubs (treboles)
* 2D = Two of Diamonds (diamantes)
* 2H = Two of Hearts (corazones)
* 2S = Two of Spades (espadas)
*/

// Funciones anonimas auto-invocadas

const miModulo = (() => {

    'use strict'



    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador = 0;
    // let puntosComputadora = 0;

    let puntosJugadores = [];

    // Referencias del html
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    // Esta función inicializa el juego

    const inicializarJuego = ( numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        };

        // deck = [];
        // deck = crearDeck();

        puntosHTML.forEach(elem => elem.innerText = 0);

        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;

        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        // divCartasJugador.innerHTML = '';
        // divCartasComputadora.innerHTML = '';



        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // Esta funcion crea un nuevo deck o nueva baraja

    // console.warn('Funcion crearDeck');

    const crearDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++) {

            for (let tipo of tipos) {
                deck.push(i + tipo)
            }

        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        }

        // console.log(deck);

        return _.shuffle(deck);
    }


    // Esta función me permite tomar una carta

    // console.warn('Funcion pedirCarta');

    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        // console.log(deck);
        // console.log(carta);
        return deck.pop();
    }

    // pedirCarta();

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? // si dentro de la const valor no es un número
            (valor === 'A') ? 11 : 10 // entonces si el valor es === A entonces es 11 y sino 10
            : valor * 1; // y si es un numero lo multiplicamos por 1
        // let puntos  = 0;

        // if(isNaN(valor)) {
        //     puntos = (valor === 'A') ? 11 : 10;
        // } else {

        //     puntos = valor * 1;
        // }

        // console.log(puntos);

    }

    // Turno: 0 = primer jugador y el último será la computadora

    const acumularPuntos = ( carta, turno ) => {

         puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
         puntosHTML[turno].innerText =  puntosJugadores[turno];
         return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
        
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana !');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }

        }, 10);
    }

    // Turno de la computadora

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);
            crearCarta(carta, puntosJugadores.length -1);

            // puntosComputadora = puntosComputadora + valorCarta(carta);
            // puntosHTML[1].innerText = puntosComputadora;

            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // divCartasComputadora.append(imgCarta);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

      

    }



    // Eventos

    btnPedir.addEventListener('click', () => {


        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        // puntosJugador = puntosJugador + valorCarta(carta);

        // console.log(puntosJugador);
        // puntosHTML[0].innerText = puntosJugador;

        crearCarta(carta, 0);

        

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });



    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);

    });

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();
    });

    return {
        nuevoJuego : inicializarJuego
    }


})();



