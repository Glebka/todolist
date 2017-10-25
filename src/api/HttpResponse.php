<?php
class HttpResponse {
    
    function status(int $statusCode) {
        http_response_code($statusCode);
        return $this;
    }    
    
    function json($data) {
        header('Content-Type: application/json', FALSE);
        echo json_encode($data);
        return $this;
    }
    
    function write(string $text) {
        header('Content-Type: text/html', FALSE);
        echo $text;
        return $this;
    }
}
