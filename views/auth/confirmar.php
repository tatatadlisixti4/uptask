<div class="contenedor confirmar">
    <?php include_once __DIR__ . '/../templates/nombre-sitio.php' ;?>
    <div class="contenedor-sm">
        <?php 
            include_once __DIR__ . '/../templates/alertas.php' ;
            if(empty($alertas)) { ?>  
                <div class="acciones">
                    <a href="/">Inicia Sesión.</a>
                </div> <?php
            } else { ?> 
                <div class="acciones">
                    <a href="/crear">¿Aún no tienes una cuenta? Obtenen una.</a>
                    <a href="/olvide">¿Olvidaste tu Password?.</a>
                </div> <?php
                
                // Posible delay en vez de dar opciones de rutas
                // sleep(3);
                // header("Location: http://ejemplo.com");
                // exit();
            }
        ?>
    
        
    </div> <!-- .contendor-sm -->
</div> 