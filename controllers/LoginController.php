<?php 
namespace Controllers;

class LoginController {
    public static function login() {
        echo "Login";

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo "Login / Post";
        }
    }

    public static function logout() {
        echo "Logout";
    }

    public static function crear() {
        echo "Crear";

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            echo "Crear / Post";
        }
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
