<?php

require_once './Router.php';
require_once './HttpRequest.php';
require_once './HttpResponse.php';

$app = new Router();

$app->get('/^\/api\/todolist\/(?<id>[\d]+)\/?$/', 
        function(HttpRequest $req, HttpResponse $res) {                        
            // Get todo item from DB by ID
            $todoItem  = array(
                '_id' => $req->getArgs()['id'],
                '_status' => 0,
                '_text' => 'Sample todo item'
            );
            $res->status(200)->json($todoItem);
        }
);

$app->handleRequest();

?>