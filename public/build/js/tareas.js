!function(){const e=e=>document.querySelector(e),a=(e,a,t)=>e.addEventListener(a,t),t=e("#agregar-tarea");async function n(){const e=new FormData;e.append("nombre",tarea);try{const a="http://localhost:3000/api/tarea",t=await fetch(a,{method:"POST",body:e});console.log(t);const n=await t.json();console.log(n)}catch(e){console.log(e)}}a(t,"click",(function(){const t=document.createElement("DIV");t.classList.add("modal"),t.innerHTML='\n            <form class="formulario nueva-tarea">\n                <legend>Añade una nueva tarea</legend>\n                <div class="campo">\n                    <label>Tarea</label>\n                    <input\n                        type="text"\n                        name="tarea"\n                        placeholder="Añadir Tarea al Proyecto Actual"\n                        id="tarea"\n                    />\n                </div>\n                <div class="opciones">\n                    <input \n                        type="submit"\n                        class="submit-nueva-tarea"\n                        value="Añadir Tarea"\n                    />    \n                    <button \n                        type="button"\n                        class="cerrar-modal"\n                    >Cancelar</button>\n                </div>\n            </form>\n        ',setTimeout((()=>{e(".formulario").classList.add("animar")}),0),a(t,"click",(a=>{a.preventDefault(),a.target.classList.contains("cerrar-modal")&&(e(".formulario").classList.add("cerrar"),setTimeout((()=>{t.remove()}),500)),a.target.classList.contains("submit-nueva-tarea")&&function(){const a=e("#tarea").value.trim();if(""===a)return void function(a,t,n){const o=e(".alerta");o&&o.remove();const r=document.createElement("DIV");r.classList.add("alerta",t),r.textContent=a,n.parentElement.insertBefore(r,n.nextElementSibling),setTimeout((()=>{r.remove()}),2e3)}("El nombre de la tarea es obligatorio","error",e(".formulario legend"));n()}()})),e(".dashboard").appendChild(t)}))}();