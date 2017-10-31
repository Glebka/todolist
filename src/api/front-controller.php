<?php

require_once './Router.php';
require_once './HttpRequest.php';
require_once './HttpResponse.php';

$app = new Router();

//GET /api/todolist/
//Gets all todo items in json format
$app->get('/^\/api\/todolist\/?$/', 
        function(HttpRequest $req, HttpResponse $res) {            
            $res->status(200)->write('Gets all todo items in json format');
        }
);

// Get todo item data by ID from database.
// GET /api/todolist/1
$app->get('/^\/api\/todolist\/(?<id>[\d]+)\/?$/', 
        function(HttpRequest $req, HttpResponse $res) {
            $res->status(200)->write('Get todo item data by ID from database.');
        }
);

//POST /api/todolist/
//Creates new todo item and returns it back to the client.
$app->post('/^\/api\/todolist\/?$/', 
        function(HttpRequest $req, HttpResponse $res) {
            $res->status(200)->write('Creates new todo item and returns it back to the client.');
        }
);

//DELETE /api/todolist/{ID}
//Deletes todo item by ID from database
$app->delete('/^\/api\/todolist\/(?<id>[\d]+)\/?$/', 
        function(HttpRequest $req, HttpResponse $res) {
            $res->status(200)->write('Deletes todo item by ID from database');
        }
);

//PUT /api/todolist/{ID}
//Overwrites todo item data with received one inside the PUT request body
$app->put('/^\/api\/todolist\/(?<id>[\d]+)\/?$/', 
        function(HttpRequest $req, HttpResponse $res) {
            $res->status(200)->write('Overwrites todo item data with received one inside the PUT request body');
        }
);

$app->handleRequest();

?>