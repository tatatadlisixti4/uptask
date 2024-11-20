<?php
namespace Controllers;

use MVC\Router;
use Model\Usuario;
use Model\Proyecto;

class DashboardController {
    public static function index(Router $router): void {
        session_start();
        isAuth();

        $id = $_SESSION['id'];
        $proyectos = Proyecto::belongsTo('propietarioId', $id);
        //debuguear($proyectos);

        $router->render('dashboard/index',  [
            'titulo' => 'Proyectos',
            'proyectos' => $proyectos
        ]);
    }

    public static function crear_proyecto (Router $router) {
        session_start();
        isAuth();
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $proyecto = new Proyecto($_POST);

            // Validación
            $alertas = $proyecto->validarProyecto();

            if(empty($alertas)) {
                // Generar una URL única
                $hash = md5(uniqid());
                $proyecto->url = $hash;

                // ALmacenar el creador del proyecto
                $proyecto->propietarioId = $_SESSION['id'];

                // Guardar proyecto
                $proyecto->guardar();

                // Redireccionar 
                header('Location: /proyecto?id=' . $proyecto->url);
            }
        }

        // $alertas = Usuario::getAlertas(); 
        $router->render('dashboard/crear-proyecto',  [
            'titulo' => 'Crear Proyecto',
            'alertas' => $alertas
        ]);
    }

    public static function proyecto(Router $router) {
        session_start();
        isAuth();

        // Revisar que la persona que visita el proyecto, es quien lo creo
        $token = $_GET['id'];

        if(!$token) header('Location: /dashboard');

        $proyecto = Proyecto::where('url', $token);
        
        if($proyecto->propietarioId !== $_SESSION['id']) {
            header('Location: /dashboard');
        } 

        $router->render('dashboard/proyecto',  [
            'titulo' => $proyecto->proyecto
        ]);

    }

    public static function perfil (Router $router): void {
        session_start();
        isAuth();
        $usuario = Usuario::find($_SESSION['id']);
        $alertas = [];
        $router->render('dashboard/perfil',  [
            'titulo' => 'Perfil',
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }
}