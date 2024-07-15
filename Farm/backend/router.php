<?php
require 'middleware/Authmiddleware.php';
require 'middleware/Guestmiddleware.php';

class Router
{
    public $route = [];

    public function middlewares($middleware){
        $this->route[count($this->route) - 1]['middleware'] = $middleware;
    }

    public function get($uri,$controller){

        $this->route[]=[
            'uri' => $uri,
            'controller' => $controller,
            'method' => 'GET',
            'middleware' => null
        ];
        return $this;
    }

    public function post($uri,$controller){
        $this->route[]=[
            'uri' => $uri,
            'controller' => $controller,
            'method' => 'POST',
            'middleware' => null
        ];
        return $this;
    }

    public function routes(){
        $arr = [];
        foreach($this->route as $routers){

            if($routers['uri'] === $_SERVER['REQUEST_URI']){

                if ($routers['middleware'] === 'authication') {
                   $routing = new Authmiddleware();
                   $routing->handler();
                }

                if ($routers['middleware'] === 'guest') {
                    $routing = new Guestmiddleware();
                    $routing->handler();
                 }

                 $arr['controller'] = $routers['controller'];
            }
        }
        if(empty($arr['controller'])){
            require 'error.php';
         }
         else{
          return $arr['controller'];
         }
        exit();
    }
}