const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const $$$ = (element, event, handler) => element.addEventListener(event, handler);
const $$$$ = (father, son) => father.querySelector(son);

const sidebar = $('.sidebar');
const mobileMenuBtn = $('#mobile-menu');
const cerrarMenuBtn = $('#cerrar-menu');
if(mobileMenuBtn) {
     $$$(mobileMenuBtn, 'click', function () {
         sidebar.classList.add('mostrar');
     });
}

if(cerrarMenuBtn) {
    $$$(cerrarMenuBtn, 'click', function () {
        sidebar.classList.add('ocultar');
        setTimeout(() => {
            sidebar.classList.remove('mostrar');
            sidebar.classList.remove('ocultar');
        }, 1000)
    });
}

// Eliminar la clase de mostrar en un tamaño mayor o igual al de una tablet
$$$(window, 'resize', function () {
    const anchoPantalla = document.body.clientWidth;
    if(anchoPantalla >= 768) {
        sidebar.classList.remove('mostrar');
    }
});
