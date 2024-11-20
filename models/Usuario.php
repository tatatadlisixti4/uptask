<?php 
namespace Model;

#[\AllowDynamicProperties]
class Usuario extends ActiveRecord
{
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'email', 'password', 'token', 'confirmado'];
    public function __construct($args = []) {
        $this->id =$args['id'] ?? null;
        $this->nombre = $args['nombre'] ??  '';
        $this->email = $args['email'] ??  '';
        $this->password = $args['password'] ??  '';
        $this->password2 = $args['password2'] ??  null;
        $this->password_actual = $args['password_actual'] ??  null;
        $this->password_nuevo  = $args['password_nuevo'] ??  null;
        $this->token = $args['token'] ?? '';
        $this->confirmado = $args['confirmado'] ?? 0; 
    }

    // Validar el login de usuarios
    public function validarLogin() {
        if(!$this->email) {
            self::$alertas['error'][] = 'El Email del Usuario es Obligatorio';
        }

        if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'][] = 'Email no válido';
        }

        if(!$this->password) {
            self::$alertas['error'][] = 'El Password del Usuario es Obligatorio';
        }

        return self::$alertas;
    }

    // Validación para cuentas nuevas
    public function validarNuevaCuenta() {
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El nombre del Usuario es Obligatorio';
        }

        if(!$this->email) {
            self::$alertas['error'][] = 'El Email del Usuario es Obligatorio';
        }

        if(!$this->password) {
            self::$alertas['error'][] = 'El Password del Usuario es Obligatorio';
        }

        if(strlen($this->password) < 6) {
            self::$alertas['error'][] = 'El Password debe contener al menos 6 caracteres';
        }

        if($this->password !== $this->password2) {
            self::$alertas['error'][] = 'Los Passwords son diferentes';
        }
        
        return self::$alertas;
    }

    public function validarPerfil() {
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El Nombre del Usuario es Obligatorio';
        }
        if(!$this->email) {
            self::$alertas['error'][] = 'El Email del Usuario es Obligatorio';
        }
        return self::$alertas;
    }

    public function nuevo_password () {
        if(!$this->password_actual) {
            self::$alertas['error'][] = 'El Password Actual es Obligatorio';
        }
        if(!$this->password_nuevo) {
            self::$alertas['error'][] = 'El Password Nuevo es Obligatorio';
        }
        if(strlen($this->password_nuevo) < 6) {
            self::$alertas['error'][] = 'El Password debe contener al menos 6 caracteres';
        }
        return self::$alertas;
    }

    // Hashea el password
    public function hashPassword() {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function validarPassword() {
        if(!$this->password) {
            self::$alertas['error'][] = 'El Password del Usuario es Obligatorio';
        }

        if(strlen($this->password) < 6) {
            self::$alertas['error'][] = 'El Password debe contener al menos 6 caracteres';
        }
        return self::$alertas;
    }

    // Generar un Token
    public function crearToken() {
        $this->token = uniqid(); // se puede combinar con mb5 pero habria que modificar el largo de la cadena en la bd
    }

    // Validar un email
    public function validarEmail() {
        if(!$this->email) {
            self::$alertas['error'][] = 'El Email es Obligatorio';
        }

        if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'][] = 'Email no válido';
        }
        return self::$alertas;
    }
}
