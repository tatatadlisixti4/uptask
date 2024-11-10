<?php 
namespace Controllers;
use MVC\Router;

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

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo "Crear / Post";
        }

        // Render a la vista
        $router->render('auth/crear',  [
            'titulo' => 'Crea tu Cuenta'
        ]);
    }

    public static function olvide() {
        echo "Olvide";

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo "Olvide / Post";
        }
    }

    public static function reestablecer() {
        echo "Reestablecer";

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo "Reestablecer / Post";
        }
    }
    
    public static function mensaje() {
        echo "Mensaje";
    }

    public static function confirmar() {
        echo "Confirmar";
    }
    
}
