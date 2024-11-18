!function(){const e=e=>document.querySelector(e),t=(e,t,a)=>e.addEventListener(t,a);!async function(){try{const e=`http://localhost:3000/api/tareas?id=${i()}`,t=await fetch(e),n=await t.json();a=n.tareas,o()}catch(e){console.log(e)}}();let a=[];const n=e("#agregar-tarea");function o(){if(function(){const t=e("#listado-tareas");for(;t.firstChild;)t.removeChild(t.firstChild)}(),0===a.length){const t=e("#listado-tareas"),a=document.createElement("LI");return a.textContent="No hay tareas",a.classList.add("no-tareas"),void t.appendChild(a)}const t={0:"Pendiente",1:"Completa"};a.forEach((n=>{const c=document.createElement("LI");c.dataset.tareaId=n.id,c.classList.add("tarea");const d=document.createElement("P");d.textContent=n.nombre,d.ondblclick=function(){r(!0,n)};const l=document.createElement("DIV");l.classList.add("opciones");const m=document.createElement("BUTTON");m.classList.add("estado-tarea"),m.classList.add(`${t[n.estado].toLowerCase()}`),m.textContent=t[n.estado],m.dataset.estadoTarea=n.estado,m.ondblclick=function(){!function(t){const n="1"===t.estado?"0":"1";t.estado=n,async function(t){const{estado:n,id:r,nombre:c}=t,d=new FormData;d.append("estado",n),d.append("nombre",c),d.append("id",r),d.append("proyectoId",i());try{const t="http://localhost:3000/api/tarea/actualizar",i=await fetch(t,{method:"POST",body:d}),c=await i.json();"exito"===c.respuesta.tipo&&(s(c.respuesta.mensaje,"exito",e(".contenedor-nueva-tarea")),a=a.map((e=>(e.id===r&&(e.estado=n),e))),o())}catch(e){console.log(e)}}(t)}({...n})};const p=document.createElement("BUTTON");p.classList.add("eliminar-tarea"),p.dataset.idTarea=n.id,p.textContent="Eliminar",p.ondblclick=function(){!function(t){Swal.fire({title:"¿Eliminar Tarea?",showCancelButton:!0,cancelButtonText:"No",confirmButtonText:"Si"}).then((n=>{n.isConfirmed&&async function(t){const{estado:n,id:r,nombre:c}=t,d=new FormData;d.append("estado",n),d.append("nombre",c),d.append("id",r),d.append("proyectoId",i());try{const t="http://localhost:3000/api/tarea/eliminar",n=await fetch(t,{method:"POST",body:d});console.log(n);const i=await n.json();console.log(i),i.resultado&&(s(i.mensaje,i.tipo,e(".contenedor-nueva-tarea")),a=a.filter((e=>e.id!==r)),o())}catch(e){console.log(e)}}(t)}))}({...n})},l.appendChild(m),l.appendChild(p),c.appendChild(d),c.appendChild(l);e("#listado-tareas").appendChild(c)}))}function r(n=!1,r={}){console.log(r);const c=document.createElement("DIV");c.classList.add("modal"),c.innerHTML=`\n            <form class="formulario nueva-tarea">\n                <legend>${n?"Editar Tarea":"Añade una nueva tarea"}</legend>\n                <div class="campo">\n                    <label>Tarea</label>\n                    <input\n                        type="text"\n                        name="tarea"\n                        placeholder="${r.nombre?"Edita la Tarea":"Añadir Tarea al Proyecto Actual"}"\n                        id="tarea"\n                        value="${r.nombre?r.nombre:""}"\n                    />\n                </div>\n                <div class="opciones">\n                    <input \n                        type="submit"\n                        class="submit-nueva-tarea"\n                        value="${r.nombre?"Guardar Cambios":"Añadir Tarea"}"\n                    />    \n                    <button \n                        type="button"\n                        class="cerrar-modal"\n                    >Cancelar</button>\n                </div>\n            </form>\n        `,setTimeout((()=>{e(".formulario").classList.add("animar")}),0),t(c,"click",(t=>{t.preventDefault(),t.target.classList.contains("cerrar-modal")&&(e(".formulario").classList.add("cerrar"),setTimeout((()=>{c.remove()}),500)),t.target.classList.contains("submit-nueva-tarea")&&function(){const t=e("#tarea").value.trim();if(""===t)return void s("El nombre de la tarea es obligatorio","error",e(".formulario legend"));!async function(t){const n=new FormData;n.append("nombre",t),n.append("proyectoId",i());try{const r="http://localhost:3000/api/tarea",i=await fetch(r,{method:"POST",body:n}),c=await i.json();if(s(c.mensaje,c.tipo,e(".formulario legend")),"exito"===c.tipo){const n=e(".modal");setTimeout((()=>{n.remove()}),3e3);const r={id:String(c.id),nombre:t,estado:"0",proyectoId:c.proyectoId};a=[...a,r],o()}}catch(e){console.log(e)}}(t)}()})),e(".dashboard").appendChild(c)}function s(t,a,n){const o=e(".alerta");o&&o.remove();const r=document.createElement("DIV");r.classList.add("alerta",a),r.textContent=t,n.parentElement.insertBefore(r,n.nextElementSibling),setTimeout((()=>{r.remove()}),3e3)}function i(){const e=new URLSearchParams(window.location.search);return Object.fromEntries(e.entries()).id}t(n,"click",(()=>{r()}))}();