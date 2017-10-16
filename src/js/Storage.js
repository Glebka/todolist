
'use strict';

class Storage {
    
    conctructor() {
    }

    static loadTodoList(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/backend.php?todoList');
        xhr.onload = function() {
            if (xhr.status === 200) {
                var todoListModel = TodoListModel.fromJSON(xhr.responseText);
                callback(todoListModel);
            }
            else {
                console.error('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();
    }

    static saveTodoList(data) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/backend.php');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log('Todo items have been saved.');                
            } else {
                console.error('Unable to save todo items!');
            }
            console.log('Server response: ', xhr.responseText);
        };
        xhr.send('{"todoList": ' + data.toJSON() + '}');
    }

    static loadDisplayMode(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/backend.php?displayMode');
        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);                
                callback(parseInt(response.displayMode));
            }
            else {
                console.error('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();
    }

    static saveDisplayMode(data) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/backend.php');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log('DisplayMode has been saved.');                
            } else {
                console.error('Unable to save DisplayMode!');
            }
            console.log('Server response: ', xhr.responseText);
        };
        xhr.send(JSON.stringify({
            displayMode: data
        }));
    }
}