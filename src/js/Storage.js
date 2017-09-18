
'use strict';

class Storage {
    
    conctructor() {
    }

    static loadTodoList() {
        return TodoListModel.fromJSON(localStorage.todoList);
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