
'use strict';

//...
Storage.loadTodoList(function(todoListModel) {
    // here I can use constructed TodoListModel instance
});
//...

class Storage {
    
    conctructor() {
    }

    static loadTodoList(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/src/backend.php?todoList');
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
        localStorage.todoList = data.toJSON();
    }

    static loadDisplayMode() {
        return Number.parseInt(localStorage.displayMode);
    }

    static saveDisplayMode(data) {
        localStorage.displayMode = data;
    }
}