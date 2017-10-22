<?php

$application = new Router();

$application->GET('/api/todolist/', function($request) {
    // code for accessing DB
});


$application->GET('/api/todolist/(?:ID[0-9]+)', function($request) {
    // code for accessing DB
});

$application->POST('/api/todolist/', function($request) {
    // code for accessing DB
});

//...

$application->handleRequest();

?>