const $=e=>document.querySelector(e),$$=e=>document.querySelectorAll(e),$$$=(e,r,t)=>e.addEventListener(r,t),$$$$=(e,r)=>e.querySelector(r),sidebar=$(".sidebar"),mobileMenuBtn=$("#mobile-menu"),cerrarMenuBtn=$("#cerrar-menu");mobileMenuBtn&&$$$(mobileMenuBtn,"click",(function(){sidebar.classList.add("mostrar")})),cerrarMenuBtn&&$$$(cerrarMenuBtn,"click",(function(){sidebar.classList.add("ocultar"),setTimeout((()=>{sidebar.classList.remove("mostrar"),sidebar.classList.remove("ocultar")}),1e3)}));