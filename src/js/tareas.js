(function() {
    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);
    const $$$ = (element, event, handler) => element.addEventListener(event, handler);
    const $$$$ = (father, son) => father.querySelector(son);

    // Botón para mostrar el modal de Aagregar Tarea
    const nuevaTareaBtn = $('#agregar-tarea');
    $$$(nuevaTareaBtn, 'click', mostrarFormulario);

    function mostrarFormulario() {
        console.log('Mostrando formulario');
        
    }
})();
