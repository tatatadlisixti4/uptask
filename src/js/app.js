const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const $$$ = (element, event, handler) => element.addEventListener(event, handler);

const $$$$ = (father, son) => father.querySelector(son);
const sidebar = $('.sidebar');
const mobileMenuBtn = $('#mobile-menu');
if(mobileMenuBtn) {
     $$$(mobileMenuBtn, 'click', function () {
         sidebar.classList.toggle('mostrar');
     });
}0