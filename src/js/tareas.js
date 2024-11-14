(function() {
    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);
    const $$$ = (element, event, handler) => element.addEventListener(event, handler);
    const $$$$ = (father, son) => father.querySelector(son);

    // Botón para mostrar el modal de Aagregar Tarea
    const nuevaTareaBtn = $('#agregar-tarea');
    $$$(nuevaTareaBtn, 'click', mostrarFormulario);

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
        });
        ($('body')).appendChild(modal); 
    }
})();
