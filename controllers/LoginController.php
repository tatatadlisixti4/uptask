<?php 
namespace Controllers;
use MVC\Router;
use Model\Usuario;

class LoginController {
    public static function login(Router $router) {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo "Login / Post";
        }
        // Render a la vista
        $router->render('auth/login',  [
            'titulo' => 'Iniciar Sesión'

        ]);
    }

    public static function logout() {
        echo "Logout";
    }

    public static function crear(Router $router) {
        $usuario = new Usuario;
        $alertas = [];
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario->sincronizar($_POST);
            $alertas = $usuario->validarNuevaCuenta(); 
            if(empty($alertas)) {
                $existeUsuario = Usuario::where('email', $usuario->email);
                
                if($existeUsuario) {
                    Usuario::setAlerta('error', 'El Usuario ya está registrado');
                    $alertas = Usuario::getAlertas();
                } else {
                    // Hashear el password
                    $usuario->hashPassword();

                    // Eliminar password2
                    unset($usuario->password2);

                    // Generar el Token
                    $usuario->crearToken();

                    // Crear un nuevo usuario
                    $resultado = $usuario->guardar();
                    if($resultado) {
                        header('Location: /mensaje');
                    }
                }
            }
        }

        // Render a la vista
        $router->render('auth/crear',  [
            'titulo' => 'Crea tu Cuenta', 
            'usuario' => $usuario,
            'alertas' => $alertas 
        ]);
    }

    public static function olvide(Router $router) {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo "Olvide / Post";
        }

        // Render a la vista
        $router->render('auth/olvide',  [
            'titulo' => 'Olvidé mi Password'
        ]);


    }

    public static function reestablecer(Router $router) {

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            
        }
        $router->render('auth/reestablecer',  [
            'titulo' => 'Reestablecer Password'
        ]);
    }
    
    public static function mensaje(Router $router) {
        $router->render('auth/mensaje',  [
            'titulo' => 'Cuenta Creada Exitosamente'
        ]);
    }

    public static function confirmar(Router $router) {
        $router->render('auth/confirmar',  [
            'titulo' => 'Confirma tu cuenta UpTask'
        ]);
    }
    
}
