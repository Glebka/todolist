<?php
// On GET - read json file content and return it to the client
// On POST - extract a POST request body and save it to the json file
header('Content-Type: application/json');
$storage = json_decode(file_get_contents('storage.json'), TRUE);
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['displayMode'])) {            
            echo json_encode(array('displayMode' => $storage['displayMode']));
            //echo '{"displayMode": '.string($storage['displayMode']).'}';
            // {"displayMode": 1}
        } elseif (isset($_GET['todoList'])) {            
            echo json_encode(array('todoList' => $storage['todoList']));
        } else {
            header('HTTP/1.1 500 Internal Server Error');
        }        
        break;
    case 'POST':
        $requestBody = file_get_contents('php://input');
        $jsonBody = json_decode($requestBody, TRUE);
        if (isset($jsonBody['displayMode'])) {
            $storage['displayMode'] = intval($jsonBody['displayMode']);
        } elseif (isset($jsonBody['todoList'])) {
            // warning: unsafe code
            $storage['todoList'] = $jsonBody['todoList'];
        } else {
            header('HTTP/1.1 500 Internal Server Error');
            exit(0);
        }
        file_put_contents('storage.json', json_encode($storage));
        break;
    default:
        header('HTTP/1.1 500 Internal Server Error');        
        break;
}
?>