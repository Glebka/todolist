<?php

require_once './HttpRequest.php';
require_once './HttpResponse.php';

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Router
 *
 * @author Gleb
 */
class Router {
    
    private $handlers = array(
        'GET' => array(),
        'POST' => array(),
        'PUT' => array(),
        'DELETE' => array()
    );
    
    function get(string $urlPattern, callable $handler) {
        $this->handlers['GET'][] = array(
            'pattern' => $urlPattern,
            'handler' => $handler
        );
    }
    
    function post(string $urlPattern, callable $handler) {
        $this->handlers['POST'][] = array(
            'pattern' => $urlPattern,
            'handler' => $handler
        );
    }
    
    function put(string $urlPattern, callable $handler) {
        $this->handlers['PUT'][] = array(
            'pattern' => $urlPattern,
            'handler' => $handler
        );
    }
    
    function delete(string $urlPattern, callable $handler) {
        $this->handlers['DELETE'][] = array(
            'pattern' => $urlPattern,
            'handler' => $handler
        );
    }
    
    function handleRequest() {
        $req = new HttpRequest();
        $res = new HttpResponse();
        if (in_array($req->getMethod(), array_keys($this->handlers))) {
            $handlersGroup = $this->handlers[$req->getMethod()];
            $isRequestHandled = FALSE;
            foreach ($handlersGroup as $record) {
                if ($req->applyPattern($record['pattern'])) {
                    try
                    {
                        call_user_func_array($record['handler'], array($req, $res));
                    } catch (Exception $ex) {                        
                        // 500 Internal server error. Unexpected exception.
                        $res->status(500)
                                ->write("Internal server error");                                
                        exit();
                    }                    
                    $isRequestHandled = TRUE;
                    break;
                }
            }
            if (!$isRequestHandled)
            {
                $res->status(400)->write('Bad request');
            }
        }
        else 
        {
            $res->status(400)->write('Bad request');
        }
    }
}
