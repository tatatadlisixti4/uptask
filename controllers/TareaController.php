<?php
namespace Controllers;

use Model\Tarea;
use Model\Proyecto;

class TareaController {
    public static function index() {

    }

    public static function crear() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            session_start();
            $proyectoId = $_POST['proyectoId'];
            $proyecto = Proyecto::where('url', $proyectoId);
            if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
                $respuesta = [
                    'tipo' => 'error', 
                    'mensaje' => 'Hubo un error al agregar la tarea'
                ];
                echo json_encode($respuesta);
                return;
            }
            
            $tarea = new Tarea($_POST);
            $tarea->proyectoId = $proyecto->id; // Se cambia la url del proyecto al id del proyecto, esto es pq a nivel de bd, estamos haciendo un insert a proyectoId con una url y proyecto id es foreign key de la tabla proyecto campo id y es un int.
            $resultado = $tarea->guardar();
            $respuesta = [
                'tipo' => 'exito', 
                'id' =>  $resultado['id'], 
                'mensaje' => 'Tarea creada correctamente'
            ];
            echo json_encode($respuesta);
            exit;
            
        }
    }

    public static function actualizar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {

        }
    }

    public static function eliminar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {

        }
    }
}