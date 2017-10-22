<?php
// On GET - read json file content and return it to the client
// On POST - extract a POST request body and save it to the json file
//----------------FUNCTIONS--------------------------
function reportErrorAndExit($code, $message) {
    header("HTTP/1.1 $code");
    echo $message;
    exit(0);
}
//-----------------------------------

function fetch($result) {
    $fieldTypes = array();
    mysqli_field_seek($result, 0);    
    while($field = mysqli_fetch_field($result)) {                
        switch($field->type) {
            case 1:                
                $fieldTypes[$field->name] = 'integer';                
                break;            
            default:
                $fieldTypes[$field->name] = 'string';
                break;
        }
    }
    $line = mysqli_fetch_assoc($result);
    $resultData = array();
    if ($line)
    {        
        foreach ($line as $fieldName => $fieldValue) {            
            $val = $fieldValue;            
            settype($val, $fieldTypes[$fieldName]);
            $resultData[$fieldName] = $val;            
        }
    } else {
        $resultData = FALSE;
    }
    
    return $resultData;
}


//----------------END-FUNCTIONS--------------------------

header('Content-Type: application/json');
$db = mysqli_connect('127.0.0.1', 'root');
if (!$db) {
    reportErrorAndExit(500, mysqli_error());    
}
if(!mysqli_select_db($db, 'todolist')) {
    reportErrorAndExit(500, mysqli_error());
}
/**
 * GET /backend.php?displayMode
 * {'displayMode': 1}
 * 
 * GET /backend.php?todoList
 * 
 * {...}
 * 
 * POST ...
 */
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['displayMode'])) {
            $query = 'SELECT * FROM displayMode';
            $result = mysqli_query($db, $query);
            if ($result) {                
                $resultArray = mysqli_fetch_assoc($result);
                echo json_encode($resultArray);
            } else {
                reportErrorAndExit(500, mysqli_error());
            }
            mysqli_free_result($result);
        } elseif (isset($_GET['todoList'])) {
            $query = 'SELECT * FROM todoitems';
            $result = mysqli_query($db, $query);
            if ($result) {
                $todoItems = array();
                while($todoItem = fetch($result)) {
                    $todoItems[] = $todoItem;
                }
                echo json_encode($todoItems);
            } else {
                reportErrorAndExit(500, mysqli_error());
            }
            mysqli_free_result($result);
        } else {
            header('HTTP/1.1 500 Internal Server Error');
        }
        break;
    case 'POST':
        $requestBody = file_get_contents('php://input');
        $jsonBody = json_decode($requestBody, TRUE);
        if (isset($jsonBody['displayMode'])) {
            $displayMode = intval($jsonBody['displayMode']);            
            $result = mysqli_query($db, "UPDATE displaymode SET displayMode=$displayMode");
            if (!$result) {
                reportErrorAndExit(500, mysqli_error());
            }            
        } elseif (isset($jsonBody['todoList'])) {            
            $result = mysqli_query($db, 'TRUNCATE TABLE todoitems');
            if (!$result) {
                reportErrorAndExit(500, mysqli_error());
            }            
            function mysqlStringify($value) {
                return "'$value'";
            }

            $escaper = function($arg) use($db) {
                return mysqli_real_escape_string($db, $arg);
            };

            foreach ($jsonBody['todoList'] as $value) {
                $fields = array_map($escaper, array_keys($value));
                $values = array_map($escaper, array_values($value));
                $stringified = array_map("mysqlStringify", $values);
                $query = 'INSERT INTO todoitems ('.implode(', ', $fields).') VALUES ('.implode(', ', $stringified).')';
                $result = mysqli_query($db, $query);
                if (!$result) {
                    reportErrorAndExit(500, mysqli_error());
                }                
            }             
        } else {
            header('HTTP/1.1 500 Internal Server Error');
            var_dump($requestBody);
            exit(0);
        }        
        break;
    default:
        header('HTTP/1.1 500 Internal Server Error');        
        break;
}
/**
 * GET - Read 
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

 /**
  * GET /api/todoitems - get all todo items
  * GET /api/todoitems/1 - get todo item with id=1
  * POST /api/todoitems - create new todo item and return it
  * PUT /api/todoitems/1 - modify existing todo item
  * DELETE /api/todoitems/1 - delete todo item with id=1
  */
?> 