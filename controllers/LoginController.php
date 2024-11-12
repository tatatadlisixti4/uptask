<?php 
namespace Controllers;
use MVC\Router;
use Classes\Email;
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

                    
                    // Enviar email
                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                    $email->enviarConfirmacion();
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
        $alertas = [];
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $usuario = new Usuario($_POST);
            $alertas = $usuario->validarEmail();

            if(empty($alertas)) {
                $usuario = Usuario::where('email', $usuario->email);

                if($usuario && $usuario->confirmado === "1") {
                    // Generar nuevo token
                    $usuario->crearToken();
                    unset($usuario->pasword2);

                    // Actualizar el usuario
                    $usuario->guardar();

                    // Enviar el email
                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                    $email->enviarInstrucciones();

                    // Imprimir la alerta

                    Usuario::setAlerta('exito', 'Hemos enviado las instrucciones a tu email');
                } else {
                    Usuario::setAlerta('error', 'El Usuario no existe o no esta confirmado');
                }
            }
        }

        $alertas = Usuario::getAlertas();
        // Render a la vista
        $router->render('auth/olvide',  [
            'titulo' => 'Olvidé mi Password', 
            'alertas' => $alertas
        ]);
    }

    public static function reestablecer(Router $router) {
        $token  = s($_GET['token']);
        $mostrar = true;

        if(!$token) header('Location: /');

        // Identificar Usuario mediante este token
        $usuario = Usuario::where('token', $token);
        
        if(empty($usuario)) {
            Usuario::setAlerta('error', 'Token No Valido');
            $mostrar = false;
        }

        if($_SERVER['REQUEST_METHOD'] === 'POST') { 
            // Añadir el nuevo password
            $usuario->sincronizar($_POST);

            $alertas = $usuario->validarPassword();

            if(empty($alertas)) {
                // Hashear el nuevo password
                $usuario->hashPassword();

                // Eliminar el token
                $usuario->token = "";
                
                // Guardar el usuario en la bd
                $resultado = $usuario->guardar();

                // Redireccionar
                if($resultado) {
                    header('Location: /');
                }
            }
        }

        $alertas = Usuario::getAlertas();
        $router->render('auth/reestablecer',  [
            'titulo' => 'Reestablecer Password', 
            'alertas' => $alertas, 
            'mostrar' => $mostrar
        ]);
    }
    
    public static function mensaje(Router $router) {
        $router->render('auth/mensaje',  [
            'titulo' => 'Cuenta Creada Exitosamente'
        ]);
    }

    public static function confirmar(Router $router) {
        $alertas = [];


        $token = s($_GET['token']);
        if(!$token) header('Location: /');
        $usuario = Usuario::where('token', $token);

        if(empty($usuario)) {
            // No se encontro match entre el token de la url y la bd
            Usuario::setAlerta('error', 'Token No Válido');
        } else {
            // Confirmar la cuenta
            $usuario->confirmado = 1;
            $usuario->token = "";
            unset($usuario->password2);
            
            // Guardar usuario
            $usuario->guardar();
            Usuario::setAlerta('exito', 'Cuenta Comprobada Correctamente');
            
        }

        $alertas = Usuario::getAlertas();

        $router->render('auth/confirmar',  [
            'titulo' => 'Confirma tu cuenta UpTask', 
            'alertas' => $alertas
        ]);
    }
    
}
