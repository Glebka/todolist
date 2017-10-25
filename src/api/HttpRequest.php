<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of HttpRequest
 *
 * @author Gleb
 */

class HttpRequest {
    
    private $method = '';
    private $url = '';
    private $uriPath = '';
    private $args = array();
    private $body = array();
    
    function __construct() {
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->url = "$_SERVER[REQUEST_SCHEME]://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $this->uriPath = parse_url($this->url, PHP_URL_PATH);
        parse_str($_SERVER['QUERY_STRING'], $this->args);
        $this->body = json_decode(file_get_contents('php://input'), TRUE);
    }
    
    function getMethod() {
        return $this->method;
    }
    
    function getUrl() {
        return $this->url;
    }
    
    function getUriPath() {
        return $this->uriPath;
    }
    
    function getArgs() {
        return $this->args;
    }
    
    function getBody() {
        return $this->body;
    }
    
    function applyPattern(string $pattern) {
        $matches = array();
        $result = preg_match_all($pattern, $this->uriPath, 
                $matches, PREG_PATTERN_ORDER);
        if ($result) {
            foreach ($matches as $key => $match) {
                if (is_string($key)) {
                    $this->args[$key] = $match[0];
                }
            }
        }        
        return $result;
    }
    
}
