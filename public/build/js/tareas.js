!function(){const t=t=>document.querySelector(t),e=(t,e,a)=>t.addEventListener(e,a);!async function(){try{const t=`http://localhost:3000/api/tareas?id=${c()}`,e=await fetch(t);console.log(e);const n=await e.json();a=n.tareas,o()}catch(t){console.log(t)}}();let a=[];const n=t("#agregar-tarea");function o(){if(function(){const e=t("#listado-tareas");for(;e.fistChild;)e.removeChild(e.firstChild)}(),0===a.length){const e=t("#listado-tareas"),a=document.createElement("LI");return a.textContent="No hay tareas",a.classList.add("no-tareas"),void e.appendChild(a)}const e={0:"Pendiente",1:"Completa"};a.forEach((a=>{const n=document.createElement("LI");n.dataset.tareaId=a.id,n.classList.add("tarea");const o=document.createElement("P");o.textContent=a.nombre;const s=document.createElement("DIV");s.classList.add("opciones");const r=document.createElement("BUTTON");r.classList.add("estado-tarea"),r.classList.add(`${e[a.estado].toLowerCase()}`),r.textContent=e[a.estado],r.dataset.estadoTarea=a.estado,r.ondblclick=function(){!function(t){console.log(t);const e="1"===t.estado?"0":"1";t.estado=e,async function(t){console.log(t);const{estado:e,id:a,nombre:n}=t,o=new FormData;o.append("estado",e),o.append("nombre",n),o.append("id",a),o.append("proyectoId",c());try{const t="http://localhost:3000/api/tarea/actualizar",e=await fetch(t,{method:"POST",body:o});await e.json();console.log(e)}catch(t){console.log(t)}}(t)}({...a})};const d=document.createElement("BUTTON");d.classList.add("eliminar-tarea"),d.dataset.idTarea=a.id,d.textContent="Eliminar",s.appendChild(r),s.appendChild(d),n.appendChild(o),n.appendChild(s);t("#listado-tareas").appendChild(n)}))}function s(e,a,n){const o=t(".alerta");o&&o.remove();const s=document.createElement("DIV");s.classList.add("alerta",a),s.textContent=e,n.parentElement.insertBefore(s,n.nextElementSibling),setTimeout((()=>{s.remove()}),3e3)}function c(){const t=new URLSearchParams(window.location.search);return Object.fromEntries(t.entries()).id}e(n,"click",(function(){const n=document.createElement("DIV");n.classList.add("modal"),n.innerHTML='\n            <form class="formulario nueva-tarea">\n                <legend>Añade una nueva tarea</legend>\n                <div class="campo">\n                    <label>Tarea</label>\n                    <input\n                        type="text"\n                        name="tarea"\n                        placeholder="Añadir Tarea al Proyecto Actual"\n                        id="tarea"\n                    />\n                </div>\n                <div class="opciones">\n                    <input \n                        type="submit"\n                        class="submit-nueva-tarea"\n                        value="Añadir Tarea"\n                    />    \n                    <button \n                        type="button"\n                        class="cerrar-modal"\n                    >Cancelar</button>\n                </div>\n            </form>\n        ',setTimeout((()=>{t(".formulario").classList.add("animar")}),0),e(n,"click",(e=>{e.preventDefault(),e.target.classList.contains("cerrar-modal")&&(t(".formulario").classList.add("cerrar"),setTimeout((()=>{n.remove()}),500)),e.target.classList.contains("submit-nueva-tarea")&&function(){const e=t("#tarea").value.trim();if(""===e)return void s("El nombre de la tarea es obligatorio","error",t(".formulario legend"));!async function(e){const n=new FormData;n.append("nombre",e),n.append("proyectoId",c());try{const c="http://localhost:3000/api/tarea",r=await fetch(c,{method:"POST",body:n});console.log(r);const d=await r.json();if(console.log(d),s(d.mensaje,d.tipo,t(".formulario legend")),"exito"===d.tipo){const n=t(".modal");setTimeout((()=>{n.remove()}),3e3);const s={id:String(d.id),nombre:e,estado:"0",proyectoId:d.proyectoId};a=[...a,s],o()}}catch(t){console.log(t)}}(e)}()})),t(".dashboard").appendChild(n)}))}();