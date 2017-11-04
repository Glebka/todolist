<?php

require_once './Router.php';
require_once './HttpRequest.php';
require_once './HttpResponse.php';

$app = new Router();

$db = new PDO('mysql:host=localhost;dbname=todolist', 'root');

//GET /api/todolist/
//Gets all todo items in json format
$app->get('/^\/api\/todolist\/?$/', 
        function(HttpRequest $req, HttpResponse $res) {
            global $db;
            $result = $db->query('SELECT * FROM todoitems');
            $todoItems = $result->fetchAll(PDO::FETCH_ASSOC);
            $res->status(200)->json($todoItems);
        }
);

// Get todo item data by ID from database.
// GET /api/todolist/1
$app->get('/^\/api\/todolist\/(?<id>[\d]+)\/?$/', 
        function(HttpRequest $req, HttpResponse $res) {
            global $db;
            
            $id = $req->getArgs()['id'];
            $query = $db->prepare('SELECT * FROM todoitems WHERE _id=?');
            if ($query->execute(array($id))) {
                $todoItem = $query->fetch(PDO::FETCH_ASSOC);
                if ($todoItem) {
                    $res->status(200)->json($todoItem);
                }
                else
                {
                    $res->status(404)->write('Not Found');
                }                
            } else {
                $res->status(500)->write('Internal server error');
            }
        }
);

//POST /api/todolist/
//Creates new todo item and returns it back to the client.
$app->post('/^\/api\/todolist\/?$/', 
        function(HttpRequest $req, HttpResponse $res) {
            global $db;
            
            $body = $req->getBody();
            $query = $db->prepare("INSERT INTO todoitems (_state, _text) VALUES (:state, :text)");
            $query->bindParam(':state', $body['_state']);
            $query->bindParam(':text', $body['_text']);            
            if($query->execute()) {
                $body['_id'] = $db->lastInsertId();
                $res->status(200)->json($body);
            } else {            
                $res->status(500)->write('Internal server error');
            }            
        }
);

//DELETE /api/todolist/{ID}
//Deletes todo item by ID from database
$app->delete('/^\/api\/todolist\/(?<id>[\d]+)\/?$/', 
        function(HttpRequest $req, HttpResponse $res) {
            global $db;
            
            $id = $req->getArgs()['id'];
            $query = $db->prepare('DELETE FROM todoitems WHERE _id=?');
            if ($query->execute(array($id))) {
                if ($query->rowCount() > 0) {
                    $res->status(200);
                } else {
                    $res->status(404)->write('Not Found');
                }                
            } else {
                $res->status(500)->write('Internal server error');
            }            
        }
);

//PUT /api/todolist/{ID}
//Overwrites todo item data with received one inside the PUT request body
$app->put('/^\/api\/todolist\/(?<id>[\d]+)\/?$/', 
        function(HttpRequest $req, HttpResponse $res) {
            global $db;
            
            $id = $req->getArgs()['id'];
            $body = $req->getBody();
            
            $query = $db->prepare('UPDATE todoitems SET _state=:state, _text=:text WHERE _id=:id');
            $query->bindParam(':id', $id);
            $query->bindParam(':state', $body['_state']);
            $query->bindParam(':text', $body['_text']);
            $subQuery = $db->prepare('SELECT * FROM todoitems WHERE _id=?');            
            if ($query->execute() && $subQuery->execute(array($id))) {
                $result = $subQuery->fetch(PDO::FETCH_ASSOC);
                if ($result) {
                    $res->status(200)->json($result);
                } else {
                    $res->status(404)->write('Not Found');
                }                
            } else {
                $res->status(500)->write('Internal server error');
            }            
        }
);

$app->handleRequest();

?>