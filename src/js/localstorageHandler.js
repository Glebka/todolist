
'use strict';

class localstorageHandler {
    
    conctructor() {
    }

    static loadTodoList(key) {
        return TodoListModel.fromJSON(localStorage[key]);
    }

    static saveTodoList(data, key) {
        localStorage[key] = data.toJSON();
    }

    static loadDisplayMode(key) {
        return Number.parseInt(localStorage[key]);
    }

    static saveDisplayMode(data, key) {
        localStorage[key] = data;
    }
}