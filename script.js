let preguntas = [];
let misRespuestas = Array.from({length:10});

document.addEventListener("DOMContentLoaded", function () {
    let token = sessionStorage.getItem('token');

    if (token) {
        console.log('Token encontrado: ', token)
    } else {
        generarToken()
    }
});

function desordenar () {
    return Math.random() - 0.5
};

const generarToken = () => {
    fetch('https://opentdb.com/api_token.php?command=request')
        .then(respuesta => { return respuesta.json() })
        .then(datos => {
            if (datos.token) {
                sessionStorage.setItem('token', datos.token)
            }
        })
        .catch(error => {
            console.error('hubo un error generando el token: ', error)
        })
};

const obtenerPreguntas = () => {
    let token = sessionStorage.getItem('token');
    if (token) {
        const categoria = document.getElementById('select1').value;
        const dificultad = document.getElementById('select2').value;
        const tipo = document.getElementById('select3').value

        if (categoria === "" || dificultad === "" || tipo === "") {
            alert('Debes seleccionar las opciones correspondientes para continuar');
            return
        }

        else {
            let url = `https://opentdb.com/api.php?amount=10&category=${categoria}&difficulty=${dificultad}&type=${tipo}&token=${token}`
            fetch(url)
              .then(respuesta => respuesta.json())
              .then(datos => {
                if (datos.results.length > 0) {
                    console.log(datos);
                    datos.results.map(preguntaAPI => {
                        preguntas.push(
                            {
                                pregunta: preguntaAPI.question,
                                respuestaCorrecta: preguntaAPI.correct_answer,
                                respuestasIncorrectas: preguntaAPI.incorrect_answers,
                                respuestasAleatorias: [preguntaAPI.correct_answer, ...preguntaAPI.incorrect_answers].sort(desordenar)
                            })
                        });

                        preguntas.map((pregunta, indice) => {
                            const preguntaHTML = document.createElement('div')
                            preguntaHTML.innerHTML = `
                            <h3>${pregunta.pregunta}</h3>
                            <ul >
                                ${pregunta.respuestasAleatorias.map(respuesta => `<li onClick="checkPreguntas('${respuesta}','${indice}')" class="respuesta">${respuesta}</li>`).join('')}
                            </ul>    
                            `
                            document.getElementById('questionario').appendChild(preguntaHTML)
                        })
                        document.getElementById('form').hidden = true
                        document.getElementById('questionario').hidden = false
                } else {
                        document.getElementById('questionario').hidden = true
                        alert('No hay una trivia disponible con las características seleccionas, por favor cambia los valores e inténtalo de nuevo')
                }    
            })
            .catch(error => console.error('hubo un error generando las preguntas: ', error))
        }

                            
    } else {
        generarToken()
    }
};

const checkPreguntas = (respuesta, indice) => {
    misRespuestas[indice] = respuesta;
};

const reset =() => {
    document.getElementById('questionario').hidden = true
    document.getElementById('form').hidden = false
};

const agregarRespuesta = (respuesta) => {
    misRespuestas.push(respuesta);
};

const prueba =()=>{
    console.log(misRespuestas)
};

function checkLleno (){
    return miArray.every(elemento =>{
        return elemento !== undefined &&  elemento !== null
    })
};


const calificar =()=>{
    let puntaje = 0;
    if(checkLleno()){
        misRespuestas.map((respuesta, indice)=>{
            console.log('respuesta: ', respuesta);
            console.log('correcta: ', preguntas[indice].respuestaCorrecta);
            console.log(respuesta===preguntas[indice].respuestaCorrecta);
            if(respuesta===preguntas[indice].respuestaCorrecta) return puntaje = puntaje + 100 
            console.log(puntaje)
            
        })
        alert(`Tu puntaje es de ${puntaje} puntos`)
    } else alert('Debes llenar todas las respuestas')
};
