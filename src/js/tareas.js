(function() { // Función encapsulada para no usar variables de otros archivos js
    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);
    const $$$ = (element, event, handler) => element.addEventListener(event, handler);
    const $$$$ = (father, son) => father.querySelector(son);

    obtenerTareas();
    let tareas = [];

    // Botón para mostrar el modal de Aagregar Tarea
    const nuevaTareaBtn = $('#agregar-tarea');
    $$$(nuevaTareaBtn, 'click', mostrarFormulario);

    async function obtenerTareas() {
        try {
            const id = obtenerProyecto();
            const url = `http://localhost:3000/api/tareas?id=${id}`;
            const respuesta = await fetch(url);
            console.log(respuesta);
            const resultado = await respuesta.json();
            // const {tareas} = resultado;
            tareas = resultado.tareas;
            mostrarTareas();

        } catch(error) {
            console.log(error);
        }
    }

    function mostrarTareas() {
        limpiarTareas();
        

        if(tareas.length === 0) {
            const contenedorTareas = $('#listado-tareas');
            const textoNoTareas = document.createElement('LI');
            textoNoTareas.textContent = 'No hay tareas';
            textoNoTareas.classList.add('no-tareas');
            contenedorTareas.appendChild(textoNoTareas);
            return;
        }

        const estados = {
            0: 'Pendiente', 
            1: 'Completa'
        };

        tareas.forEach(tarea => {
            const contenedorTarea = document.createElement('LI');
            contenedorTarea.dataset.tareaId = tarea.id;
            contenedorTarea.classList.add('tarea');

            const nombreTarea = document.createElement('P');
            nombreTarea.textContent = tarea.nombre;

            const opcionesDiv = document.createElement('DIV')
            opcionesDiv.classList.add('opciones');

            // Botones
            const btnEstadoTarea = document.createElement('BUTTON');
            btnEstadoTarea.classList.add('estado-tarea');
            btnEstadoTarea.classList.add(`${estados[tarea.estado].toLowerCase()}`);
            btnEstadoTarea.textContent = estados[tarea.estado];
            btnEstadoTarea.dataset.estadoTarea = tarea.estado;
            btnEstadoTarea.ondblclick = function() {
                cambiarEstadoTarea({...tarea}); // con el spreed operator paso una copia de la tarea, pq js actualiza todo auto si uso lo original
            }            

            const btnEliminarTarea = document.createElement('BUTTON');
            btnEliminarTarea.classList.add('eliminar-tarea');
            btnEliminarTarea.dataset.idTarea = tarea.id;
            btnEliminarTarea.textContent = 'Eliminar';
            btnEliminarTarea.ondblclick = function() {
                confirmarEliminarTarea({...tarea});
            }

            opcionesDiv.appendChild(btnEstadoTarea);
            opcionesDiv.appendChild(btnEliminarTarea);
            

            contenedorTarea.appendChild(nombreTarea);
            contenedorTarea.appendChild(opcionesDiv);
            const listadoTareas = $('#listado-tareas');
            listadoTareas.appendChild(contenedorTarea);
        });
    }

    function mostrarFormulario() {
        const modal = document.createElement('DIV');
        modal.classList.add('modal');
        modal.innerHTML = `
            <form class="formulario nueva-tarea">
                <legend>Añade una nueva tarea</legend>
                <div class="campo">
                    <label>Tarea</label>
                    <input
                        type="text"
                        name="tarea"
                        placeholder="Añadir Tarea al Proyecto Actual"
                        id="tarea"
                    />
                </div>
                <div class="opciones">
                    <input 
                        type="submit"
                        class="submit-nueva-tarea"
                        value="Añadir Tarea"
                    />    
                    <button 
                        type="button"
                        class="cerrar-modal"
                    >Cancelar</button>
                </div>
            </form>
        `;

        // Gracias a la logica del modelo de concurrencias de js, es posible manejar los eventos del formulario, ya esta funcion se va a ejecutar cuando tanto la pila como la cola estén vacías y haya pasado el tiempo del settimeup, para ese entonces el html dinamico va a estar procesado

        setTimeout(() => {
            ($('.formulario')).classList.add('animar');
        }, 0);

        // Delegation a continuacion ya que no podemos manejar los eventos en funcion a clases que fueron creadas con inner html. Entonces le delegaremos el manejo de eventos al contenedor padre creado via html y no dinamicamente, pero siempre y cuando el evento ocurra en la clase hija que queremos.

        $$$(modal, 'click', (e) => {
            e.preventDefault();
            if(e.target.classList.contains('cerrar-modal')) {
                ($('.formulario')).classList.add('cerrar');
                setTimeout(() => {
                    modal.remove();
                }, 500);
            }
            if(e.target.classList.contains('submit-nueva-tarea')) {
                submitFormularioNuevaTarea();
            }
            
        });
        ($('.dashboard')).appendChild(modal); 
    }

    function submitFormularioNuevaTarea() {
        const tarea = $('#tarea').value.trim();
        if(tarea === '') {
            mostrarAlerta('El nombre de la tarea es obligatorio', 'error', $('.formulario legend'));
            return;
        }

        agregarTarea(tarea);
    }
    // Mostrar un mensaje en la interfaz
    function mostrarAlerta(mensaje, tipo, referencia) {
        const alertaPrevia = $('.alerta');
        if(alertaPrevia) {
            alertaPrevia.remove();
        }

        const alerta = document.createElement('DIV');
        alerta.classList.add('alerta', tipo);
        alerta.textContent = mensaje;

        // Dentro del padre inserto despues del hijo una alerta. Esto es pq no queremos insertar dentro del legend e incumplir normas de html
        referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);  

        // Eliminar la alerta despues de 5 segundos
        setTimeout( ()=> {
            alerta.remove();
        }, 3000);
    }

    // Consultar el servidor para añadir una nueva tarea al proyecto actual
    async function agregarTarea(tarea) {
        const datos = new FormData();
        datos.append('nombre', tarea);
        datos.append('proyectoId', obtenerProyecto()); 

        try {
            const url = 'http://localhost:3000/api/tarea';
            const respuesta = await fetch(url, {
                method: 'POST', 
                body: datos
            });
            console.log(respuesta);
            const resultado = await respuesta.json();
            console.log(resultado);

            // Cuando se genera un error pero en el lado del servidor, ya sea por un envio de id falso u otra trampa. No es un error que el catch puede verificar ya que la conexión con el endpoit fue exitosa
            mostrarAlerta(resultado.mensaje, resultado.tipo, $('.formulario legend'));

            if(resultado.tipo === 'exito') {
                const modal = $('.modal');
                setTimeout(()=> {
                    modal.remove();
                    //window.location.reload(); 
                }, 3000);

                // Agregar el objeto de tarea al global de tareas
                const tareaObj = {
                    id: String(resultado.id), 
                    nombre: tarea,
                    estado: "0", 
                    proyectoId: resultado.proyectoId
                }
                tareas = [...tareas, tareaObj];
                mostrarTareas();
            }

        } catch(error) {
            console.log(error);
        }
    }

    function cambiarEstadoTarea(tarea) {
        console.log(tarea);   
        const nuevoEstado = tarea.estado === "1" ? "0" : "1";
        tarea.estado = nuevoEstado;
        actualizarTarea(tarea);
    }

    async function actualizarTarea(tarea) {
        console.log(tarea);
        
        const {estado, id, nombre} = tarea;
        const datos = new FormData();
        datos.append('estado', estado);
        datos.append('nombre', nombre);
        datos.append('id', id);
        datos.append('proyectoId', obtenerProyecto());

        // for(let valor of datos.values()) {
        //     console.log(valor);
        // } 
        try {
            const url = 'http://localhost:3000/api/tarea/actualizar';
            const respuesta = await fetch(url, {
                method: 'POST', 
                body: datos
            });
            const resultado = await respuesta.json();
            if(resultado.respuesta.tipo === 'exito') {
                mostrarAlerta(resultado.respuesta.mensaje, 'exito', $('.contenedor-nueva-tarea'));

                tareas = tareas.map(tareaMemoria => { // Recorre y crea un nuevo arreglo sin mutar el original
                    if(tareaMemoria.id === id) {
                        console.log(tareaMemoria.id);
                        console.log('Modificando', id);
                        tareaMemoria.estado = estado;
                    }
                    return tareaMemoria;
                }); 
                mostrarTareas(); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    function confirmarEliminarTarea(tarea) {
        Swal.fire({
            title: "¿Eliminar Tarea?",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonText: "Si",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                eliminarTarea(tarea);
            }
        });
    }

    async function eliminarTarea(tarea) {
        const datos = new FormData();
        try {
            console.log(tarea);
        } catch (error) {
            console.log(error);
        }
    }

    function obtenerProyecto() {
        // Convertir los datos del query string en un objeto js estándar
        // [1] window.loca... : Devuelve el querystring, URLsearch...: hace un objeto con la llave y valor del query string
        const proyectoParams = new URLSearchParams(window.location.search); 

        // [2].entries() : devuelve el iterador que contiene un array de pares llave y valor. .fromEntries: construye un objeto gracias al iterador
        const proyecto = Object.fromEntries(proyectoParams.entries()); 

        // [3] Sin esta transformación de objeto urlsearch... a objeto puro, habría que acceder a los elementeos del query string de forma más engorrosa, con metodos como get, etc.
        return proyecto.id; 
    }

    function limpiarTareas() {
        const listadoTareas = $('#listado-tareas');
        while(listadoTareas.firstChild) {
            listadoTareas.removeChild(listadoTareas.firstChild);
        }
    }
})();
