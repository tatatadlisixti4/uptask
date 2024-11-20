<?php include_once __DIR__ . '/header-dashboard.php' ;?>
<div class="contenedor-sm">
    <?php include_once __DIR__ . '/../templates/alertas.php';?>
    <form class="formulario" method="POST" action="/perfil">
        <div class="campo">
            <label for="nombre">Nombre</label>
            <input
                type="text"
                value="<?php echo $usuario->nombre;?>"
                name="nombre"
                placeholder="Tu Nombre"
            />
        </div>

        <div class="campo">
            <label for="email">Email</label>
            <input
                type="text"
                value="<?php echo $usuario->email;?>"
                name="email"
                placeholder="Tu Email"
            />
        </div>
        <input type="submit" value="Guardar Cambios">
    </form>
</div>
<?php include_once __DIR__ . '/footer-dashboard.php' ;?>