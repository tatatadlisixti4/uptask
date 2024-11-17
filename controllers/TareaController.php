<?php
namespace Controllers;

use Model\Tarea;
use Model\Proyecto;

class TareaController {
    public static function index() {
        $proyectoId = $_GET['id'];
        if(!$proyectoId)header('Location: /dashboard');
        $proyecto = Proyecto::where('url', $proyectoId);

        session_start();
        if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
            header('Location: /404');
        }

        $tareas = Tarea::belongsTo('proyectoId', $proyecto->id);
        echo json_encode(['tareas' => $tareas]);

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
                'mensaje' => 'Tarea creada correctamente', 
                'proyectoId' => $proyecto->id
            ];
            echo json_encode($respuesta);
            exit;
            
        }
    }

    public static function actualizar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Validar que el proyecto exista
            $proyecto = Proyecto::where('url', $_POST['proyectoId']);

            session_start();
            if(!$proyecto || $proyecto->propietarioId !== $_SESSION['id']) {
                $respuesta = [
                    'tipo' => 'error', 
                    'mensaje' => 'Hubo un error al actualizar la tarea'
                ];
                echo json_encode($respuesta);
                return;
            }

            $tarea = new Tarea($_POST);
            $tarea->proyectoId = $proyecto->id;
            $resultado = $tarea->guardar();
            if($resultado) {
                $respuesta = [
                    'tipo' => 'exito', 
                    'id' =>  $tarea->id, 
                    'proyectoId' => $proyecto->id,
                    'mensaje' => 'Actualizado Correctamente'
                ];
                echo json_encode(['respuesta' => $respuesta]);
            }
        }
    }

    public static function eliminar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {

        }
    }
}